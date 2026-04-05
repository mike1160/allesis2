import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Allesis — Webdesign, hosting en SEO in Haarlem";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(135deg, #0a0f1e 0%, #1a3bcc 55%, #0f2490 100%)",
        }}
      >
        <div style={{ fontSize: 82, fontWeight: 900, color: "#ffffff", letterSpacing: "-0.04em" }}>Allesis</div>
        <div style={{ fontSize: 38, fontWeight: 700, color: "#e8ff47", marginTop: 20 }}>Jouw digitale partner in Haarlem</div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.85)", marginTop: 36, maxWidth: 900, lineHeight: 1.35 }}>
          Webdesign · Hosting · SEO · AVG-compliance · Thaise websites & vertaling
        </div>
        <div style={{ fontSize: 22, color: "rgba(255,255,255,0.65)", marginTop: 48 }}>allesis.nl · info@allesis.nl</div>
      </div>
    ),
    { ...size },
  );
}
