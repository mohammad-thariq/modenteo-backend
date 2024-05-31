import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto"
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getUploadFile = (body, table_name, callBack) => {
  const base64ToFileObject = (base64String) => {
    const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return new Error('Invalid base64 string');
    }

    const buffer = Buffer.from(matches[2], 'base64');
    const fileType = matches[1].split('/')[1];
    const md5Hash = crypto.createHash('md5').update(buffer).digest('hex');

    return {
      name: `image.${fileType}`,
      data: buffer,
      size: buffer.length,
      encoding: '7bit',
      tempFilePath: '',
      truncated: false,
      mimetype: matches[1],
      md5: md5Hash,
      mv: (destination, callback) => {
        console.log(destination, 'destinationdestination')
        fs.writeFile(destination, buffer, callback);
      }
    };
  };

  let files = body.files;
  let imageFile;
  if (!files || files.length === 0) {
    const base64Image = body.image;
    if (base64Image) {
      imageFile = base64ToFileObject(base64Image);
      if (imageFile instanceof Error) {
        return res.status(400).json({ success: 0, message: imageFile.message });
      }
      files = { image: imageFile };
    }
  }
  let sampleFile;
  let uploadPath;
  if (!files || Object.keys(files).length === 0) {
    return callBack({ error: "No files were uploaded." });
  }

  sampleFile = files;
  uploadPath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "public",
    "upload",
    `${table_name}-${sampleFile.image.name}`
  );
  sampleFile.image.mv(uploadPath, function (err) {
    if (err) {
      return callBack({
        error: "Problem in Uploading Image",
      });
    }
    return callBack(
      null,
      `/${"upload"}/${table_name}-${sampleFile.image.name}`
    );
  });
};
