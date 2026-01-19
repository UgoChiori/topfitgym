import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../auth/Firebase";

export const uploadService = async (file: File, path: string) => {
  const storageRef = ref(storage, path);

  await uploadBytes(storageRef, file);

  const url = await getDownloadURL(storageRef);
  return url;
};
