import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../client";
import formidable from "formidable";
import fs from "fs";

interface ParsedForm {
  err: any;
  fields: formidable.Fields;
  files: formidable.Files;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let err, fields, files;

    // parse form
    try {
      ({ err, fields, files } = await parseForm(req));
    } catch (error) {
      console.error("[FORM] Error parsing image form: ", error);
      res.status(500).json({ error: "Error parsing form data" });
      return;
    }

    if (err) {
      throw new Error("[FOTO] Error parsing form data.");
    }

    // extract fields
    const file = extractFile(files);
    const userId: string | string[] = fields.userId;
    const userIdStr = Array.isArray(userId) ? userId[0] : userId;
    const fileName: string | string[] = fields.filename;

    if (!file || typeof file.filepath !== "string") {
      throw new Error("[FOTO] Invalid file");
    }

    const fileBuffer = fs.readFileSync(file.filepath);
    if (!fileBuffer || !userId) {
      throw new Error("[FOTO] Missing required parameters");
    }

    // generateSignedUrl - this is for Supabase to generate a userId specific upload url
    const signedUrlData = await generateSignedUrl(userIdStr);

    await uploadFileToSignedUrl(userIdStr, signedUrlData.token, fileBuffer);

    res
      .status(200)
      .json({ message: "[FOTO] Profile photo uploaded successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: String(error) });
    }
  }
};

const parseForm = (req: NextApiRequest): Promise<ParsedForm> =>
  new Promise((resolve) =>
    new formidable.IncomingForm().parse(req, (err, fields, files) =>
      resolve({ err, fields, files })
    )
  );

const extractFile = (files: formidable.Files): formidable.File | undefined => {
  let file: formidable.File | formidable.File[] | undefined = files.file;
  if (Array.isArray(file)) {
    file = file[0];
  }
  return file;
};

const generateSignedUrl = async (userId: string) => {
  const uploadUrl = `${userId}/profile-photo.jpg`
  const { data, error } = await supabase.storage
    .from("profile-photos")
    .createSignedUploadUrl(uploadUrl);
  if (error) {
    throw error;
  }

  return data;
};

const uploadFileToSignedUrl = async (
  userId: string,
  token: string,
  fileBuffer: Buffer
) => {
  const { error } = await supabase.storage
    .from("profile-photos")
    .uploadToSignedUrl(`${userId}/profile-photo.jpg`, token, fileBuffer, {
      contentType: "image/jpeg",
    });

  if (error) {
    throw error;
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
