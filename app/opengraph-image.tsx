import { ImageResponse } from "next/og";

export const alt = "Allesis — Webdesign Haarlem";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background: "#0B1628",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ color: "#fff", fontSize: 64, fontWeight: 900 }}>
          Allesis<span style={{ color: "#3B82F6" }}>.nl</span>
        </div>
        <div style={{ color: "#94A3B8", fontSize: 28, marginTop: 16 }}>
          Webdesign · Haarlem · AVG · SEO
        </div>
        <div style={{ color: "#C8FF00", fontSize: 22, marginTop: 24 }}>
          🐾 Elke website doet ook goed
        </div>
      </div>
    ),
    { ...size }
  );
}
