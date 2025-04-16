import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Save to public/uploads directory
    const path = join(process.cwd(), "public/uploads", file.name);
    await writeFile(path, buffer);
    
    return NextResponse.json({ 
      message: "File uploaded",
      url: `/uploads/${file.name}` 
    });
  } catch (error) {
    return NextResponse.json({ error: "Error uploading file" }, { status: 500 });
  }
} 