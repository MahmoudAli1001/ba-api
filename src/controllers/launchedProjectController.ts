import { Request, Response, NextFunction } from "express";
import { CreateLaunchedProjectDto, UpdateLaunchedProjectDto } from "../dtos/launchedProjectsDto";
import LaunchedProjectService from "../services/launchedProjectService";
import uploadToS3 from "../utils/fileUpload";
import AppError from "../utils/appError";

export class LaunchedProjectController {
  async createLaunchedProject(req: Request, res: Response, next: NextFunction) {
    try {
      let createLaunchedProjectDto: CreateLaunchedProjectDto = req.body;
      const file = req.file;
      if (!file) {
        throw new AppError("File is required", 400);
      }
      const { Key, Location } = await uploadToS3(file, "project");
      createLaunchedProjectDto.image = Location;
      const result = await LaunchedProjectService.createLaunchedProject(createLaunchedProjectDto);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getLaunchedProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, keyword } = req.query;
      const result = await LaunchedProjectService.getLaunchedProjects(
        Number(page) || 1,
        Number(limit) || 10,
        keyword || "" 
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getLaunchedProjectById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await LaunchedProjectService.getLaunchedProjectById(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateLaunchedProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const file = req.file;
      const updateLaunchedProjectDto: UpdateLaunchedProjectDto = req.body;
      if (file) {
        const { Key, Location } = await uploadToS3(file, "project");
        updateLaunchedProjectDto.image = Location;
      }

      const result = await LaunchedProjectService.updateLaunchedProject(id, updateLaunchedProjectDto);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteLaunchedProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await LaunchedProjectService.deleteLaunchedProject(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new LaunchedProjectController();
