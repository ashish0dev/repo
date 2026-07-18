import { ImageResponse } from "next/og";

export const alt = "REVO — Leave Your Mark";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAFBFC",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(#1F2937 1px, transparent 1px), linear-gradient(90deg, #1F2937 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.04,
          }}
        />
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 22px",
            borderRadius: 999,
            background: "rgba(22,163,74,0.1)",
            border: "1px solid rgba(22,163,74,0.25)",
            color: "#16A34A",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 36,
          }}
        >
          India's Live Active Grid
        </span>
        <div
          style={{
            display: "flex",
            fontSize: 128,
            fontWeight: 900,
            color: "#1F2937",
            letterSpacing: -4,
            lineHeight: 0.9,
          }}
        >
          Leave your&nbsp;
          <span style={{ color: "#16A34A", fontStyle: "italic", fontWeight: 400 }}>mark.</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#4B5563",
            marginTop: 28,
            fontWeight: 400,
          }}
        >
          Join the Revo waitlist
        </div>
      </div>
    ),
    { ...size }
  );
}
