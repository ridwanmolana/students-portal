import { NextRequest, NextResponse } from "next/server";
import { getSheetRows } from "@/lib/google-sheets";
import { searchDrive } from "@/lib/google-drive";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q")?.toLowerCase();

    if (!query || query.length < 2) {
      return NextResponse.json({ success: true, data: [] });
    }

    const [remindersData, topicsData, driveFiles] = await Promise.all([
      // Fetch Reminders
      getSheetRows("Reminder!A2:D").catch(() => []),
      // Fetch Topics
      getSheetRows("Topic!A2:F").catch(() => []),
      // Search Drive
      searchDrive(query, [
        process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID || "",
        process.env.GOOGLE_DRIVE_SCHEDULE_FOLDER_ID || "",
        process.env.GOOGLE_DRIVE_MATERIALS_FOLDER_ID || ""
      ].filter(Boolean))
    ]);

    const results = [];

    // Filter Reminders (Date, Day, Notes)
    remindersData.forEach(row => {
      const title = row[2] || "";
      if (title.toLowerCase().includes(query)) {
        results.push({
          id: `rem-${Math.random()}`,
          title: title,
          type: "Reminder",
          url: "/reminder",
        });
      }
    });

    // Filter Topics (Month, Week, Subject, Topic, Activities, Task)
    topicsData.forEach(row => {
      const subject = row[2] || "";
      const topic = row[3] || "";
      if (subject.toLowerCase().includes(query) || topic.toLowerCase().includes(query)) {
        results.push({
          id: `top-${Math.random()}`,
          title: `${subject}: ${topic}`,
          type: "Topic",
          url: "/topic",
        });
      }
    });

    // Process Drive Files
    driveFiles.forEach((file: any) => {
      let type = "Gallery";
      let url = `/gallery`; // Generic fallback

      // Try to determine category based on parent ID
      const parents = file.parents || [];
      if (parents.includes(process.env.GOOGLE_DRIVE_SCHEDULE_FOLDER_ID)) {
        type = "Schedule";
        url = "/schedule";
      } else if (parents.includes(process.env.GOOGLE_DRIVE_MATERIALS_FOLDER_ID)) {
        type = "Materials";
        url = "/materials";
      } else {
        // If it's a folder, it might be an album
        if (file.mimeType === "application/vnd.google-apps.folder") {
          url = `/gallery/${file.id}`;
        }
      }

      results.push({
        id: file.id,
        title: file.name,
        type: type,
        url: url,
        thumbnail: file.thumbnailLink,
      });
    });

    return NextResponse.json({
      success: true,
      data: results.slice(0, 20) // Limit to 20 results
    });

  } catch (error: any) {
    console.error("Global Search API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to search" },
      { status: 500 }
    );
  }
}
