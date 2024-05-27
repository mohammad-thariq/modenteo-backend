import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getUploadFile = (files, table_name, callBack) => {
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
  console.log(uploadPath, "uploadPath");
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
