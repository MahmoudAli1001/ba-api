import { Request, Response, NextFunction } from "express";
import feasibilityStudyService from "../services/feasibilityStudyService";

// Define DTOs inline to avoid import issues
interface CreateFeasibilityStudyDto {
  name: string;
  description: string;
  image: string;
  price: string;
  category: string;
}

interface UpdateFeasibilityStudyDto {
  name?: string;
  description?: string;
  image?: string;
  price?: string;
  category?: string;
}

export class FeasibilityStudyController {
  // Get all feasibility studies
  async getAllFeasibilityStudies(req: Request, res: Response, next: NextFunction) {
    try {
      const studies = await feasibilityStudyService.getAllFeasibilityStudies();
      res.status(200).json({
        status: "success",
        results: studies.length,
        data: studies
      });
    } catch (error) {
      next(error);
    }
  }

  // Get feasibility study by ID
  async getFeasibilityStudyById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const study = await feasibilityStudyService.getFeasibilityStudyById(id);
      res.status(200).json({
        status: "success",
        data: study
      });
    } catch (error) {
      next(error);
    }
  }

  // Create new feasibility study
  async createFeasibilityStudy(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateFeasibilityStudyDto = req.body;
      const study = await feasibilityStudyService.createFeasibilityStudy(data);
      res.status(201).json({
        status: "success",
        message: "Feasibility study created successfully",
        data: study
      });
    } catch (error) {
      next(error);
    }
  }

  // Update feasibility study
  async updateFeasibilityStudy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data: UpdateFeasibilityStudyDto = req.body;
      const study = await feasibilityStudyService.updateFeasibilityStudy(id, data);
      res.status(200).json({
        status: "success",
        message: "Feasibility study updated successfully",
        data: study
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete feasibility study
  async deleteFeasibilityStudy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await feasibilityStudyService.deleteFeasibilityStudy(id);
      res.status(200).json({
        status: "success",
        message: "Feasibility study deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }

  // Get feasibility studies by category
  async getFeasibilityStudiesByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { category } = req.params;
      const studies = await feasibilityStudyService.getFeasibilityStudiesByCategory(category);
      res.status(200).json({
        status: "success",
        results: studies.length,
        data: studies
      });
    } catch (error) {
      next(error);
    }
  }

  // Search feasibility studies
  async searchFeasibilityStudies(req: Request, res: Response, next: NextFunction) {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({
          status: "error",
          message: "Search query is required"
        });
      }
      
      const studies = await feasibilityStudyService.searchFeasibilityStudies(q);
      res.status(200).json({
        status: "success",
        results: studies.length,
        data: studies
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new FeasibilityStudyController();
