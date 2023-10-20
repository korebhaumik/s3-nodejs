import * as mongoose from "mongoose";

export interface FileType extends mongoose.Document {
  username?: string;
  URL: string;
  ETag: string;
  filename: string;
  metadata?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FileSchema = new mongoose.Schema<FileType>(
  {
    username: { type: String },
    URL: { type: String, required: true, unique: true },
    ETag: { type: String, required: true, unique: true },
    filename: { type: String, required: true },
    metadata: { type: String },
  },
  { timestamps: true }
);

const File = mongoose.model<FileType>("File", FileSchema);

export { File };
