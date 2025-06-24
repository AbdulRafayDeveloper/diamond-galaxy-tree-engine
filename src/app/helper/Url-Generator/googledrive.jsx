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

export async function uploadAndGeneratePublicUrl(
  buffer,
  originalFilename,
  mimeType
) {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(
      process.cwd(),
      "src/app/config/daimond-galaxy-eec256426b59.json"
    ),
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  const drive = google.drive({ version: "v3", auth });

  const fileMetadata = {
    name: originalFilename,
    parents: [parents_key],
  };

  const media = {
    mimeType,
    body: bufferToStream(buffer), // ✅ convert buffer to stream here
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
