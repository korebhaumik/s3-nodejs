import { File } from "../schema/file.schema";

export const saveToDB = async (
  URL: string,
  filename: string,
  ETag: string,
  username?: string,
  metadata?: string
) => {
  try {
    const fileInstance = new File({ URL, username, metadata, filename, ETag });
    await fileInstance.save();
    return fileInstance;
  } catch (err) {
    throw err;
  }
};

export const deleteFromDB = async (filename: string) => {
  try {
    const res = await File.deleteOne({ filename });
    return res;
  } catch (err) {
    throw err;
  }
};
