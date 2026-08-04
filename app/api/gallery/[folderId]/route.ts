import { NextRequest, NextResponse } from "next/server";
import { getDriveImages } from "@/lib/google-drive";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ folderId: string }> }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const pageToken = searchParams.get("pageToken") || undefined;
    
    const { folderId } = await params;

    const result = await getDriveImages(folderId, pageToken, 20);
    
    // Format images
    const images = result.files.map(file => ({
      id: file.id,
      name: file.name,
      thumbnailLink: file.thumbnailLink, // usually 220px wide
      webContentLink: file.webContentLink, // download link
      width: file.imageMediaMetadata?.width || 0,
      height: file.imageMediaMetadata?.height || 0,
    }));

    return NextResponse.json({
      success: true,
      data: {
        images,
        nextPageToken: result.nextPageToken
      }
    });
  } catch (error: any) {
    console.error("Gallery Images API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load images" },
      { status: 500 }
    );
  }
}
