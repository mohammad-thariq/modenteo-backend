import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto"
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getUploadFile = (body, table_name, callBack) => {

  const base64ToFileObject = (dataURI, callBack) => {
    const base64Data = dataURI.split(';base64,').pop();
    let imgName = Date.now()+'.jpg';

    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "public",
      "upload",
      `${table_name}-${imgName}`
    );
    const binaryData = Buffer.from(base64Data, 'base64');
    fs.writeFile(filePath, binaryData, (err) => {
      if (err) {
        return callBack({
          error: "Problem in Uploading Image",
        });
      }
      return callBack(
        null,
        `/${"upload"}/${table_name}-${imgName}`
      );
    });
  }

  let files = body.files;
  let imageFile;
  const base64Image = body.image;
  if(base64Image == undefined){
    return callBack({
      error: "Image missing",
    });
  }
  if (!files || files.length === 0) {
    if (base64Image != undefined && base64Image.includes(process.env.BASEURL)) {
      let url = body.image;
      let baseUrl = process.env.BASEURL;
      const modifiedUrl = url.replace(baseUrl, "");

      return callBack(
        null,
        modifiedUrl
      );
    } else {
      return base64ToFileObject(base64Image, callBack);
      if (imageFile instanceof Error) {
        return callBack({
          error: "Problem in Image file",
        });
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
