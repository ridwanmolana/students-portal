import { NextRequest, NextResponse } from "next/server";
import { getSheetRows } from "@/lib/google-sheets";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    // Paging size is 7 days as per PRD
    const pageSize = 7; 
    
    // Structure: Date, Day, Notes, Details
    const remindersData = await getSheetRows("Reminder!A2:D");
    
    // Parse Reminders
    const allReminders = remindersData.map((row, index) => ({
      id: index + 1,
      date: row[0] || "",
      day: row[1] || "",
      title: row[2] || "",
      details: row[3] || "",
    }));

    // Group by Date for 7-day pagination
    // 1. Get unique dates
    const uniqueDates = Array.from(new Set(allReminders.map(r => r.date)));
    
    // 2. Pagination calculation
    const totalDays = uniqueDates.length;
    const totalPages = Math.ceil(totalDays / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    // 3. Slice the unique dates for the current page
    const pageDates = uniqueDates.slice(startIndex, endIndex);
    
    // 4. Filter all reminders that fall into these page dates
    const paginatedReminders = allReminders.filter(r => pageDates.includes(r.date));

    // Optional: Grouping the paginated reminders by date for easier UI rendering
    const groupedReminders = pageDates.map(dateStr => {
      return {
        date: dateStr,
        // Finding the day from the first reminder that matches the date
        day: allReminders.find(r => r.date === dateStr)?.day || "", 
        reminders: paginatedReminders.filter(r => r.date === dateStr).map(r => ({
          id: r.id,
          title: r.title,
          details: r.details
        }))
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        page,
        totalPages,
        groupedReminders
      }
    });
  } catch (error: any) {
    console.error("Reminders API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load reminders data" },
      { status: 500 }
    );
  }
}
