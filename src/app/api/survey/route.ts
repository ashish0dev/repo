import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { GOOGLE_SHEET_WEBHOOK_URL } from "@/lib/config";

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();

    if (!answers) {
      return NextResponse.json({ error: "Answers are required" }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const q1 = answers[1] || "";
    const q2 = answers[2] || "";
    const q3 = answers[3] || "";
    const q4 = answers[4] || "";
    const q5 = answers[5] || "";

    // ── 1. WRITE TO LOCAL CSV SPREADSHEET ──
    try {
      const filePath = path.join(process.cwd(), "survey.csv");

      // Initialize file with headers if it doesn't exist
      if (!fs.existsSync(filePath)) {
        const headers = "Timestamp,Q1: Track Fitness,Q2: Consistency Challenge,Q3: Privacy Comfort,Q4: Motivation,Q5: Switching App\n";
        fs.writeFileSync(filePath, headers, "utf-8");
      }

      // Escape cell function for CSV
      const escapeCSV = (val: string) => {
        if (!val) return '""';
        const escaped = String(val).replace(/"/g, '""');
        return `"${escaped}"`;
      };

      const newRow = [
        escapeCSV(timestamp),
        escapeCSV(q1),
        escapeCSV(q2),
        escapeCSV(q3),
        escapeCSV(q4),
        escapeCSV(q5)
      ].join(",") + "\n";

      fs.appendFileSync(filePath, newRow, "utf-8");
    } catch (fsError) {
      console.warn("Local Survey CSV write bypassed (read-only filesystem):", fsError);
    }

    // ── 2. FORWARD TO SURVEY GOOGLE SHEET WEBHOOK ──
    const surveyWebhookUrl = process.env.GOOGLE_SHEET_SURVEY_WEBHOOK_URL;
    
    if (surveyWebhookUrl) {
      try {
        await fetch(surveyWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp,
            q1,
            q2,
            q3,
            q4,
            q5
          }),
        });
      } catch (sheetErr) {
        console.error("Survey Google Sheets Webhook error:", sheetErr);
      }
    } else if (GOOGLE_SHEET_WEBHOOK_URL) {
      // Fallback: Send to the main waitlist sheet webhook but flag it as a survey
      try {
        await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "survey",
            timestamp,
            q1,
            q2,
            q3,
            q4,
            q5
          }),
        });
      } catch (sheetErr) {
        console.error("Survey Webhook fallback error:", sheetErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing survey submission:", error);
    return NextResponse.json({ error: "Failed to process survey" }, { status: 500 });
  }
}
