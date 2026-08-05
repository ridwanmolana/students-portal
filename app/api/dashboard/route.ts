export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { getSheetRows } from "@/lib/google-sheets";

export async function GET() {
  try {
    // 1. Fetch Reminders (Sheet Name: "Reminder", assuming headers on row 1)
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

    // Fetch Announcements (Sheet Name: "announcement")
    // Structure: A=id, B=title, C=description, D=link, E=isActive
    let announcementsData: string[][] = [];
    try {
      announcementsData = await getSheetRows("announcement!A2:E");
    } catch (e) {
      console.warn("Could not fetch announcements sheet", e);
    }

    const announcements = announcementsData
      .filter(row => row[4] && row[4].toString().toLowerCase() === "true")
      .map((row) => {
        const description = row[2] && row[2] !== "-" ? row[2] : "";
        const link = row[3] && row[3] !== "-" ? row[3] : "";
        return {
          id: parseInt(row[0]) || 0,
          title: row[1] || "",
          description,
          link
        };
      });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysReminders: any[] = [];
    const upcomingReminders: any[] = [];

    allReminders.forEach(r => {
      if (!r.date) return;
      // We assume date is in a format parseable by Date, like MM/DD/YYYY or YYYY-MM-DD
      const rDate = new Date(r.date);
      if (isNaN(rDate.getTime())) return;
      rDate.setHours(0, 0, 0, 0);

      const itemTodays = {
        id: r.id,
        title: r.title,
        time: r.date + " " + r.day,
        details: r.details
      };

      const itemUpcoming = {
        id: r.id,
        title: r.title,
        date: r.date + " " + r.day,
        tag: "Event",
        details: r.details
      };

      if (rDate.getTime() === today.getTime()) {
        todaysReminders.push(itemTodays);
      } else if (rDate.getTime() > today.getTime()) {
        upcomingReminders.push(itemUpcoming);
      }
    });

    // Optionally slice if we only want to show a few
    const finalTodaysReminders = todaysReminders.slice(0, 4);
    const finalUpcomingReminders = upcomingReminders.slice(0, 5);

    // 2. Fetch Birthdays (Sheet Name: "Students", Structure: StudentID, Name, Gender, DateOfBirth, PIN)
    // We only need Name and DateOfBirth to check if it's today.
    const studentsData = await getSheetRows("Students!B2:D"); 
    
    // Mock birthday logic checking
    // 'today' is already defined above
    let birthdayStudent = null;
    
    for (const row of studentsData) {
      const name = row[0];
      const dobStr = row[2]; // assuming index 2 is DateOfBirth (B=Name, C=Gender, D=DOB)
      
      if (name && dobStr) {
        let dobMonth = -1;
        let dobDate = -1;
        
        if (dobStr.includes("/")) {
          // Parse MM/DD/YYYY
          const parts = dobStr.split("/");
          if (parts.length >= 3) {
            dobMonth = parseInt(parts[0], 10) - 1;
            dobDate = parseInt(parts[1], 10); 
          }
        } else if (dobStr.includes("-")) {
          // Parse YYYY-MM-DD
          const parts = dobStr.split("-");
          if (parts.length >= 3) {
            dobMonth = parseInt(parts[1], 10) - 1;
            dobDate = parseInt(parts[2], 10);
          }
        }

        if (dobMonth === today.getMonth() && dobDate === today.getDate()) {
          birthdayStudent = name;
          break;
        }
      }
    }
    
    // If no birthday is found today, birthdayStudent will remain null.
    return NextResponse.json({
      success: true,
      data: {
        todaysReminders: finalTodaysReminders,
        upcomingReminders: finalUpcomingReminders,
        birthdayStudent,
        announcements
      }
    });
  } catch (error: any) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load dashboard data" },
      { status: 500 }
    );
  }
}
