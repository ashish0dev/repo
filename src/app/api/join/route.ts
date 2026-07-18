import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { WAITLIST_BASE_COUNT, GOOGLE_SHEET_WEBHOOK_URL } from "@/lib/config";

export async function POST(req: NextRequest) {
  try {
    const { email, name, username, area } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    let position = WAITLIST_BASE_COUNT + 1;
    let refId = Math.random().toString(36).substring(2, 8).toUpperCase();
    let isUpdate = false;

    // ── 1. TRY LOCAL CSV SPREADSHEET (Bypassed on Vercel/Read-only environments) ──
    try {
      const filePath = path.join(process.cwd(), "waitlist.csv");

      // Initialize file with headers if it doesn't exist
      if (!fs.existsSync(filePath)) {
        const headers = "Position,Username,Full Name,Email,Area,Date Claimed,Invite Code\n";
        fs.writeFileSync(filePath, headers, "utf-8");
      }

      // Read file contents to check if email already exists
      const fileContent = fs.readFileSync(filePath, "utf-8");
      let fileLines = fileContent.split("\n");

      // Escape helper for CSV cells
      const escapeCSV = (val: string) => {
        if (!val) return '""';
        const escaped = String(val).replace(/"/g, '""');
        return `"${escaped}"`;
      };

      for (let i = 1; i < fileLines.length; i++) {
        const line = fileLines[i].trim();
        if (!line) continue;

        // Extract parts by splitting on commas (account for quotes)
        const parts = line.split(",").map(p => p.replace(/^"|"$/g, ""));
        if (parts.length >= 7) {
          const rowEmail = parts[3];
          if (rowEmail.toLowerCase() === email.toLowerCase()) {
            isUpdate = true;
            position = parseInt(parts[0]) || WAITLIST_BASE_COUNT;
            refId = parts[6];

            // Rebuild this row with updated values (preserve position, original date, and refId)
            const updatedRow = [
              position,
              username ? `@${username.toLowerCase()}` : parts[1] || "",
              name ? escapeCSV(name) : escapeCSV(parts[2] || ""),
              escapeCSV(email),
              area ? escapeCSV(area) : escapeCSV(parts[4] || "Pending"),
              parts[5] || new Date().toISOString(),
              refId
            ].join(",");

            fileLines[i] = updatedRow;
            break;
          }
        }
      }

      if (isUpdate) {
        // Re-write updated content
        const newContent = fileLines.filter(line => line.trim() !== "").join("\n") + "\n";
        fs.writeFileSync(filePath, newContent, "utf-8");
      } else {
        // Insert new record
        const activeLines = fileLines.filter(line => line.trim() !== "");
        const recordCount = Math.max(0, activeLines.length - 1);
        position = WAITLIST_BASE_COUNT + recordCount + 1;
        refId = Math.random().toString(36).substring(2, 8).toUpperCase();

        const newRow = [
          position,
          username ? `@${username.toLowerCase()}` : "",
          name ? escapeCSV(name) : '""',
          escapeCSV(email),
          area ? escapeCSV(area) : '"Pending"',
          new Date().toISOString(),
          refId
        ].join(",") + "\n";

        fs.appendFileSync(filePath, newRow, "utf-8");
      }
    } catch (fsError) {
      // Bypassed on Vercel serverless functions (which have read-only filesystems)
      console.warn("Local CSV write bypassed (read-only filesystem):", fsError);
    }

    // ── 2. FORWARD TO GOOGLE SHEETS WEBHOOK (Real database on Vercel) ──
    if (GOOGLE_SHEET_WEBHOOK_URL) {
      try {
        const sheetResponse = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            position,
            username: username || "",
            name: name || "",
            email,
            area: area || "Pending",
            refId
          }),
        });

        if (sheetResponse.ok) {
          const sheetResult = await sheetResponse.json();
          // Use the sheet-generated position if available (makes Sheets the source of truth)
          if (sheetResult && sheetResult.position) {
            position = sheetResult.position;
          }
        }
      } catch (sheetErr) {
        console.error("Google Sheets Webhook error:", sheetErr);
      }
    }

    return NextResponse.json({
      success: true,
      position,
      refId
    });
  } catch (error) {
    console.error("Error processing waitlist join:", error);
    return NextResponse.json({ error: "Failed to process registration" }, { status: 500 });
  }
}
