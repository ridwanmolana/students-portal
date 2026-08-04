import { NextRequest, NextResponse } from "next/server";
import { getSheetRows } from "@/lib/google-sheets";

export async function POST(request: NextRequest) {
  try {
    const { pin } = await request.json();
    
    if (!pin || typeof pin !== "string") {
      return NextResponse.json({ success: false, error: "Invalid PIN provided" }, { status: 400 });
    }

    // Fetch Students sheet (StudentID, Name, Gender, DateOfBirth, PIN)
    // Assuming headers are on row 1, data starts row 2.
    const studentsData = await getSheetRows("Students!A2:E");
    
    // Find a student with a matching PIN
    const studentRow = studentsData.find(row => row[4] === pin);
    
    if (studentRow) {
      return NextResponse.json({
        success: true,
        data: {
          studentId: studentRow[0],
          name: studentRow[1],
          gender: studentRow[2],
        }
      });
    }

    // If we reach here, PIN didn't match
    return NextResponse.json({ success: false, error: "Incorrect PIN" }, { status: 401 });
    
  } catch (error: any) {
    console.error("PIN Validation API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to validate PIN" },
      { status: 500 }
    );
  }
}
