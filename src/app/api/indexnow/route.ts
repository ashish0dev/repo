import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { urls } = body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid 'urls' array in request body" },
        { status: 400 }
      );
    }

    const host = "revo.origina.in";
    const key = "8d6db954e7d4464c8c7f99ee3091df01";
    const keyLocation = `https://${host}/${key}.txt`;

    const indexNowPayload = {
      host,
      key,
      keyLocation,
      urlList: urls,
    };

    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(indexNowPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `IndexNow API responded with status ${response.status}: ${errorText}` },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Successfully submitted ${urls.length} URLs to IndexNow.`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
