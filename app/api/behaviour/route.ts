import { NextRequest, NextResponse } from "next/server";
import { getSheetRows } from "@/lib/google-sheets";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const studentId = searchParams.get("studentId");
    
    if (!studentId) {
      return NextResponse.json({ success: false, error: "Missing studentId parameter" }, { status: 400 });
    }

    // Fetch Behaviour sheet (StudentID, DateMIS, Behaviour, TeacherNotes)
    const behaviourData = await getSheetRows("Behaviour!A2:D");
    
    // Filter records for the specific student
    const studentRecords = behaviourData
      .filter(row => row[0] === studentId)
      .map((row, index) => ({
        id: `${studentId}-${index}`,
        date: row[1] || "",
        behaviour: row[2] || "",
        notes: row[3] || ""
      }))
      // Sort descending by date (assuming DateMIS is parseable or sortable strings like YYYY-MM-DD)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({
      success: true,
      data: studentRecords
    });
    
  } catch (error: any) {
    console.error("Behaviour API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load behaviour records" },
      { status: 500 }
    );
  }
}
