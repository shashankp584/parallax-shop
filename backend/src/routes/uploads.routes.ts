import { Router } from "express";
import multer from "multer";
import { uploadToCloudinary } from "../utils/cloudinary";
import { authMiddleware, adminOnly } from "../middleware/auth.middleware";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", authMiddleware, adminOnly, upload.single("file"), async (req: any, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file" });
    // convert buffer to base64 data uri
    const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    const url = await uploadToCloudinary(dataUri);
    res.json({ url });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Upload failed" });
  }
});

export default router;
