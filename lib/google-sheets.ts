import { google } from "googleapis";

// Initialize the Google Auth client using environment variables
export async function getGoogleAuthClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  // Replace literal '\n' in the environment variable with actual newlines
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error("Missing Google API credentials in environment variables.");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets.readonly",
      "https://www.googleapis.com/auth/drive.readonly"
    ],
  });

  return auth;
}

// Fetch rows from a specific sheet range
export async function getSheetRows(range: string) {
  const spreadsheetId = process.env.SPREADSHEET_ID;

  if (!spreadsheetId) {
    throw new Error("Missing SPREADSHEET_ID in environment variables.");
  }

  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: "v4", auth });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    return response.data.values || [];
  } catch (error) {
    console.error("Error fetching Google Sheets data:", error);
    throw new Error("Failed to fetch data from Google Sheets.");
  }
}
