export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
import { NextResponse } from "next/server";
import { getDriveFolders } from "@/lib/google-drive";

export async function GET() {
  try {
    const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
    if (!rootFolderId) {
      throw new Error("Missing GOOGLE_DRIVE_ROOT_FOLDER_ID environment variable");
    }

    const folders = await getDriveFolders(rootFolderId);
    
    // Formatting for frontend
    const formattedFolders = folders.map(f => ({
      id: f.id,
      name: f.name,
      modifiedTime: f.modifiedTime
    }));

    return NextResponse.json({
      success: true,
      data: formattedFolders
    });
  } catch (error: any) {
    console.error("Gallery API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load folders" },
      { status: 500 }
    );
  }
}
