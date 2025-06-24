import { google } from "googleapis";
import path from "path";
import { Readable } from "stream";

const parents_key = process.env.PARENTS_KEY;

function bufferToStream(buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

function extractFileId(url) {
  const match = url.match(/(?:id=)([^&]+)/);
  return match ? match[1] : null;
}

export async function updateAndGeneratePublicUrl(
  buffer,
  originalFilename,
  mimeType,
  previousImageUrl = null
) {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(
      process.cwd(),
      "src/app/config/daimond-galaxy-eec256426b59.json"
    ),
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  const drive = google.drive({ version: "v3", auth });

  if (previousImageUrl) {
    const oldFileId = extractFileId(previousImageUrl);
    if (oldFileId) {
      try {
        await drive.files.delete({ fileId: oldFileId });
      } catch (error) {
        console.error("Failed to delete old image:", error.message);
      }
    }
  }

  const fileMetadata = {
    name: originalFilename,
    parents: [parents_key],
  };

  const media = {
    mimeType,
    body: bufferToStream(buffer),
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: "id",
  });

  const fileId = response.data.id;

  await drive.permissions.create({
    fileId,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });

  return `https://drive.usercontent.google.com/download?id=${fileId}&export=view`;
}
