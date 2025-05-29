import { Request, Response, NextFunction } from "express";
import imageService from "../services/imageService";

export class MediaController {
  async uploadFile(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file;

      let imageUrl: string | undefined;
      if (file) {
        imageUrl = await imageService.uploadImage(file);
      }

      res.status(201).json(imageUrl);
    } catch (error) {
      next(error);
    }
  }
}

export default new MediaController();
