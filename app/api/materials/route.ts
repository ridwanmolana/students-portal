import { NextResponse } from "next/server";
import { getDrivePdfs } from "@/lib/google-drive";

export async function GET() {
  try {
    const folderId = process.env.GOOGLE_DRIVE_MATERIALS_FOLDER_ID;
    if (!folderId) {
      throw new Error("Missing GOOGLE_DRIVE_MATERIALS_FOLDER_ID environment variable");
    }

    const pdfs = await getDrivePdfs(folderId);
    
    const formattedPdfs = pdfs.map(f => ({
      id: f.id,
      name: f.name,
      thumbnailLink: f.thumbnailLink,
      webContentLink: f.webContentLink,
    }));

    return NextResponse.json({
      success: true,
      data: formattedPdfs
    });
  } catch (error: any) {
    console.error("Materials API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load materials PDFs" },
      { status: 500 }
    );
  }
}
