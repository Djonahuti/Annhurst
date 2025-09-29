import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file");
  const filename = formData.get("filename");

  if (!file || !(file instanceof File) || !filename) {
    return NextResponse.json({ error: "Missing file or filename" }, { status: 400 });
  }

  // Save to public/receipts/dr
  const buffer = Buffer.from(await file.arrayBuffer());
  const savePath = path.join(process.cwd(), "public", "receipts", "dr", filename.toString());

  try {
    // Overwrite if file exists
    await fs.writeFile(savePath, buffer);
    return NextResponse.json({ filename });
  } catch (err) {
    return NextResponse.json({ error: "Failed to save file" }, { status: 500 });
  }
}
