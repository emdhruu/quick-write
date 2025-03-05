import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.CALLBACK_URL
);

export const uploadDrive = async (user, fileContent, fileName) => {
  try {
    oauth2Client.setCredentials({
      access_token: user.accessToken,
      refresh_token: user.refreshToken,
    });

    const drive = google.drive({ version: "v3", auth: oauth2Client });

    const fileMetadata = {
      name: fileName,
      mimeType: "application/vnd.google-apps.document",
    };

    const media = {
      mimeType: "text/plain",
      body: fileContent,
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id, webViewLink",
    });

    return response.data; // returns file ID and Drive Link
  } catch (error) {
    console.error("Google Drive Upload Error:", error);
    throw new Error("Failed to upload to Google Drive");
  }
};
