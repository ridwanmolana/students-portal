import { NextRequest, NextResponse } from "next/server";
import { getSheetRows } from "@/lib/google-sheets";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filterMonth = searchParams.get("month");
    const filterWeek = searchParams.get("week");
    
    // Structure: Month, Week, Subject, Topic, Activities, Task
    const topicsData = await getSheetRows("Topic!A2:F");
    
    // Parse Topics
    const allTopics = topicsData.map((row, index) => ({
      id: index + 1,
      month: row[0] || "",
      week: row[1] || "",
      subject: row[2] || "",
      topic: row[3] || "",
      activities: row[4] || "",
      task: row[5] || "",
    }));

    // Extract unique months and weeks for the filter dropdowns
    const availableMonths = Array.from(new Set(allTopics.map(t => t.month).filter(Boolean)));
    const availableWeeks = Array.from(new Set(allTopics.map(t => t.week).filter(Boolean)));
    
    // Apply filters
    let filteredTopics = allTopics;
    if (filterMonth && filterMonth !== "All") {
      filteredTopics = filteredTopics.filter(t => t.month === filterMonth);
    }
    
    if (filterWeek && filterWeek !== "All") {
      filteredTopics = filteredTopics.filter(t => t.week === filterWeek);
    }

    return NextResponse.json({
      success: true,
      data: {
        topics: filteredTopics,
        availableMonths,
        availableWeeks
      }
    });
  } catch (error: any) {
    console.error("Topics API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load topics data" },
      { status: 500 }
    );
  }
}
