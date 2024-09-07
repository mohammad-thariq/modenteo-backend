import AWS from "aws-sdk";
import fs from "fs";
import DataBaseEnvironmentConfig from "../../config/database.config.js";
import { exit } from "process";

AWS.config.update({ region: "eu-north-1" });
const s3 = new AWS.S3({
  accessKeyId: DataBaseEnvironmentConfig.s3_access_key_id,
  secretAccessKey: DataBaseEnvironmentConfig.s3_secret_access_key,
});

export const getUploadFile = (req, table_name, callBack) => {
  const base64ToFileObject = (dataURI, callBack) => {
    const base64Data = dataURI.split(";base64,").pop();
    let imgName = Date.now() + ".jpg";

    const binaryData = Buffer.from(base64Data, "base64");

    const uploadParams = {
      Bucket: "modenteo",
      Key: `${table_name}-${imgName}`,
      Body: binaryData,
      ContentEncoding: "base64",
      ContentType: "image/jpeg",
    };

    s3.upload(uploadParams, (err, data) => {
      if (err) {
        return callBack({
          error: "Problem in Uploading Image",
        });
      }
      return callBack(null, data.Location);
    });
  };

  let files = req.files;
  let body = req.body;
  if (!files || files.length === 0) {
    const base64Image = body.image;
    if (base64Image == undefined) {
      return callBack({
        error: "Image missing",
      });
    }
    if (base64Image != undefined && base64Image.includes(process.env.BASEURL)) {
      return callBack(null, base64Image);
    } else {
      return base64ToFileObject(base64Image, callBack);
    }
  } else if (files && files.length >= 0) {
    let sampleFile;
    if (!files || Object.keys(files).length === 0) {
      return callBack({ error: "No files were uploaded." });
    }

    sampleFile = files.image;
    let imgName = Date.now() + "-" + sampleFile.name + ".jpg";

    fs.readFile(sampleFile.tempFilePath, (err, data) => {
      if (err) {
        return callBack({
          error: "Problem reading file",
        });
      }

      const uploadParams = {
        Bucket: "modenteo",
        Key: `${table_name}-${imgName}`,
        Body: data,
        ContentType: sampleFile.mimetype,
      };

      s3.upload(uploadParams, (err, data) => {
        console.log(err, 'error');
        
        if (err) {
          return callBack({
            error: "Problem in Uploading Image",
          });
        }
        return callBack(null, data.Location);
      });
    });
  }
};
