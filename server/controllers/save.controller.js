import { uploadToDrive } from "../utils/googleDrive.js";
import dbscript from "../utils/dbscript.js";

export const saveDraft = async (req, res) => {
  try {
    const { title, content, saveToDrive } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    let driveResponse = null;

    if (saveToDrive) {
      if (!user.accessToken) {
        return res
          .status(401)
          .json({ error: "Google Drive access not set up" });
      }
      driveResponse = await uploadToDrive(user, content, title);
    }

    const draft = await dbscript.draft.create({
      data: {
        title,
        content,
        isSaved: saveToDrive,
        userId: user.id,
      },
    });

    res.status(201).json({
      message: saveToDrive
        ? "Draft saved to both database and Google Drive"
        : "Draft saved in database only",
      draft,
      fileId: driveResponse?.id || null,
      link: driveResponse?.webViewLink || null,
    });
  } catch (error) {
    console.error("Error saving draft:", error);
    
    res.status(500).json({ error: "Failed to save draft" });
  }
};
