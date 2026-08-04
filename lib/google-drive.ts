import { google } from "googleapis";
import { getGoogleAuthClient } from "./google-sheets"; // reuse auth client

export async function getDriveClient() {
  const auth = await getGoogleAuthClient();
  return google.drive({ version: "v3", auth });
}

export async function getDriveFolders(parentFolderId: string) {
  const drive = await getDriveClient();
  
  try {
    const res = await drive.files.list({
      q: `'${parentFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: "files(id, name, modifiedTime)",
      orderBy: "modifiedTime desc",
    });
    
    return res.data.files || [];
  } catch (error) {
    console.error("Error fetching Drive folders:", error);
    throw new Error("Failed to fetch folders from Google Drive.");
  }
}

export async function getDriveImages(folderId: string, pageToken?: string, pageSize = 20) {
  const drive = await getDriveClient();
  
  try {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`,
      fields: "nextPageToken, files(id, name, mimeType, webContentLink, thumbnailLink, imageMediaMetadata)",
      pageSize,
      pageToken: pageToken || undefined,
      orderBy: "createdTime desc",
    });
    
    return {
      files: res.data.files || [],
      nextPageToken: res.data.nextPageToken || null,
    };
  } catch (error) {
    console.error("Error fetching Drive images:", error);
    throw new Error("Failed to fetch images from Google Drive.");
  }
}

export async function getDrivePdfs(folderId: string) {
  const drive = await getDriveClient();
  
  try {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and mimeType='application/pdf' and trashed=false`,
      fields: "files(id, name, mimeType, webContentLink, thumbnailLink)",
      orderBy: "createdTime desc",
    });
    
    return res.data.files || [];
  } catch (error) {
    console.error("Error fetching Drive PDFs:", error);
    throw new Error("Failed to fetch PDFs from Google Drive.");
  }
}

export async function searchDrive(query: string, folderIds: string[]) {
  if (!query || folderIds.length === 0) return [];
  const drive = await getDriveClient();
  
  try {
    // Construct query: name contains 'query' and is in one of the folders
    const parentsQuery = folderIds.map(id => `'${id}' in parents`).join(' or ');
    // Escaping single quotes in query is important to avoid query errors
    const safeQuery = query.replace(/'/g, "\\'");
    
    const res = await drive.files.list({
      q: `(${parentsQuery}) and name contains '${safeQuery}' and trashed=false`,
      fields: "files(id, name, mimeType, webContentLink, thumbnailLink, parents)",
      pageSize: 20,
    });
    
    return res.data.files || [];
  } catch (error) {
    console.error("Error searching Drive:", error);
    return []; // Return empty on error so it doesn't crash the whole search
  }
}
