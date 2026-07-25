"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  CHECK_ICONS,
  CHECK_LABELS,
  type CheckKey,
  type MonitorHistoryEntry,
  type WebsiteCheckResult,
  getOverallLabel,
  getOverallStatus,
} from "@/lib/website-monitor-types";

export interface ExportRow {
  url: string;
  check: string;
  status: string;
  detail: string;
  tijdstip: string;
}

function formatDateForFilename(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

function formatDisplayDate(iso: string): string {
  return new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

function escapeCsv(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function checksToRows(
  url: string,
  checks: WebsiteCheckResult,
  timestamp: string,
): ExportRow[] {
  return (Object.keys(CHECK_LABELS) as CheckKey[]).map((key) => ({
    url,
    check: `${CHECK_ICONS[key]} ${CHECK_LABELS[key]}`,
    status: checks[key].status,
    detail: checks[key].detail,
    tijdstip: timestamp,
  }));
}

export function buildExportRows(
  results: Record<string, WebsiteCheckResult>,
  timestamp: string,
): ExportRow[] {
  return Object.entries(results).flatMap(([url, checks]) => checksToRows(url, checks, timestamp));
}

export function buildHistoryExportRows(entries: MonitorHistoryEntry[]): ExportRow[] {
  return entries.flatMap((entry) => buildExportRows(entry.results, entry.timestamp));
}

export function downloadCsv(rows: ExportRow[], filename?: string) {
  const name = filename ?? `website-check-${formatDateForFilename()}.csv`;
  const header = "url,check,status,detail,tijdstip";
  const lines = rows.map(
    (row) =>
      [
        escapeCsv(row.url),
        escapeCsv(row.check),
        escapeCsv(row.status),
        escapeCsv(row.detail),
        escapeCsv(row.tijdstip),
      ].join(","),
  );
  const csv = [header, ...lines].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

export function downloadPdf(
  results: Record<string, WebsiteCheckResult>,
  timestamp: string,
  filename?: string,
) {
  const name = filename ?? `website-check-${formatDateForFilename()}.pdf`;
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("allesis.nl – Website Monitor", 14, 18);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Controle uitgevoerd op: ${formatDisplayDate(timestamp)}`, 14, 26);

  let startY = 34;

  for (const [url, checks] of Object.entries(results)) {
    const overall = getOverallLabel(getOverallStatus(checks));

    if (startY > 250) {
      doc.addPage();
      startY = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(url, 14, startY);
    doc.setFontSize(10);
    doc.text(`Totaalstatus: ${overall}`, 14, startY + 6);

    autoTable(doc, {
      startY: startY + 10,
      head: [["Check", "Status", "Detail"]],
      body: (Object.keys(CHECK_LABELS) as CheckKey[]).map((key) => [
        `${CHECK_ICONS[key]} ${CHECK_LABELS[key]}`,
        checks[key].status,
        checks[key].detail,
      ]),
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: { fillColor: [26, 59, 204] },
      margin: { left: 14, right: 14 },
    });

    startY = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 14;
  }

  doc.save(name);
}

export function downloadHistoryPdf(entries: MonitorHistoryEntry[], filename?: string) {
  const name = filename ?? `website-check-geschiedenis-${formatDateForFilename()}.pdf`;
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("allesis.nl – Website Monitor", 14, 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Geschiedenis export – ${formatDisplayDate(new Date().toISOString())}`, 14, 26);

  let startY = 34;

  for (const entry of entries) {
    if (startY > 240) {
      doc.addPage();
      startY = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`Controle ${formatDisplayDate(entry.timestamp)}`, 14, startY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`${entry.urls.length} URL(s)`, 14, startY + 5);

    startY += 10;

    for (const [url, checks] of Object.entries(entry.results)) {
      if (startY > 250) {
        doc.addPage();
        startY = 20;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(url, 14, startY);
      doc.text(`Totaalstatus: ${getOverallLabel(getOverallStatus(checks))}`, 14, startY + 5);

      autoTable(doc, {
        startY: startY + 8,
        head: [["Check", "Status", "Detail"]],
        body: (Object.keys(CHECK_LABELS) as CheckKey[]).map((key) => [
          `${CHECK_ICONS[key]} ${CHECK_LABELS[key]}`,
          checks[key].status,
          checks[key].detail,
        ]),
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [26, 59, 204] },
        margin: { left: 14, right: 14 },
      });

      startY = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
    }

    startY += 6;
  }

  doc.save(name);
}

interface ExportButtonsProps {
  results: Record<string, WebsiteCheckResult>;
  timestamp: string;
  className?: string;
}

export function MonitorExportButtons({ results, timestamp, className = "" }: ExportButtonsProps) {
  const hasResults = Object.keys(results).length > 0;

  if (!hasResults) return null;

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <button
        type="button"
        aria-label="Exporteer resultaten als CSV"
        onClick={() => downloadCsv(buildExportRows(results, timestamp))}
        className="rounded-lg border border-[#3B6D11] bg-white px-4 py-2.5 font-lato text-sm font-semibold text-[#3B6D11] transition hover:bg-[#eef2ff]"
      >
        Exporteer als CSV
      </button>
      <button
        type="button"
        aria-label="Exporteer resultaten als PDF"
        onClick={() => downloadPdf(results, timestamp)}
        className="rounded-lg bg-[#3B6D11] px-4 py-2.5 font-lato text-sm font-semibold text-white transition hover:bg-[#2F5610]"
      >
        Exporteer als PDF
      </button>
    </div>
  );
}
