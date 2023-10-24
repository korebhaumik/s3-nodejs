import { Request, Response } from "express";
import {
  DeleteObjectCommand,
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { config } from "dotenv";
import { deleteFromDB, saveToDB } from "../services/file.service";
import path from "path";

config();

// Create a new S3Client object with the AWS access key ID, secret access key, and region specified in the environment variables
const client = new S3Client({
  region: process.env.BUCKET_REGION as string,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID as string,
    secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
  },
});

export const creates3handler = async (req: Request, res: Response) => {
  try {
    // Check if req.file is undefined or if req.body is falsy
    if (req.file === undefined || !req.body)
      return res.status(400).json({ message: "No file uploaded." });

    // Extract the username and metadata from the request body
    const { username, metadata } = req.body;

    // Define an array of allowed file extensions and get the file extension of the uploaded file
    const allowedExtensions = [
      ".png",
      ".jpeg",
      ".jpg",
      ".txt",
      ".pdf",
      ".pptx",
    ];
    const fileExtension = path.extname(req.file.originalname);

    // Check if the file extension is not allowed
    if (!allowedExtensions.includes(fileExtension))
      return res.status(400).json({
        message: `Invalid file type. File types supported are '.png', '.jpeg', '.jpg', '.txt', '.pdf' `,
      });

    // Define a maximum file size limit of 10 MB and check if the file size exceeds the limit
    const maxFileSize = 10 * 1024 * 1024; // 10 MB
    if (req.file.size > maxFileSize)
      throw new Error("File size exceeds the maximum limit of 10 MB.");

    // Create a new Upload object with the S3Client object and the file data, including the file buffer, file name, and S3 bucket name
    const upload = new Upload({
      client,
      params: {
        ACL: "public-read",
        Bucket: process.env.BUCKET_NAME as string,
        Key: req.file!.originalname,
        Body: req.file!.buffer,
        // Body: fs.readFileSync("src/controllers/Assignment_1.pdf"),
      },
    });

    // Upload the file to S3 and extract the file URL, ETag, and filename from the upload result
    const result = await upload.done();
    // @ts-ignore
    const URL: string = result.Location;
    // @ts-ignore
    const ETag: string = result.ETag;
    // @ts-ignore
    const filename: string = result.Key;

    // Save the file metadata to mongoDB
    const fileInstance = await saveToDB(
      URL,
      filename,
      ETag,
      username,
      metadata
    );
    res.status(200).json(fileInstance);
  } catch (err: any) {
    // Catch any errors thrown during the file upload process and return a 400 response with an error message
    console.log(err);
    res.status(400).json({ code: err.code, message: err.message });
  }
};

export const deletes3handler = async (req: Request, res: Response) => {
  try {
    const { filename } = req.query;

    const command = new DeleteObjectCommand({
      Bucket: process.env.BUCKET_NAME as string,
      Key: filename as string | undefined,
    });

    const result = await client.send(command);
    await deleteFromDB(filename as string);
    console.log(result);
    res.status(200).json(result);
  } catch (err: any) {
    // Catch any errors thrown during the file upload process and return a 400 response with an error message
    console.log(err);
    res.status(400).json({ code: err.code, message: err.message });
  }
};

export const gets3handler = async (req: Request, res: Response) => {
  try {
    const { filename } = req.query;
    console.log(filename)

    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME as string,
      Key: filename as string | undefined,
    });

    const result = await client.send(command);
    console.log(result);

    res.status(200).json(result);
  } catch (err: any) {
    // Catch any errors thrown during the file upload process and return a 400 response with an error message
    console.log(err);
    res.status(400).json({ code: err.code, message: err.message });
  }
};
