import FeasibilityStudy, { IFeasibilityStudy } from "../models/FeasibilityStudy";
import AppError from "../utils/appError";

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

export class FeasibilityStudyService {
  // Get all feasibility studies
  async getAllFeasibilityStudies(): Promise<IFeasibilityStudy[]> {
    try {
      const studies = await FeasibilityStudy.find().sort({ createdAt: -1 });
      return studies;
    } catch (error) {
      throw new AppError("Failed to fetch feasibility studies", 500);
    }
  }

  // Get feasibility study by ID
  async getFeasibilityStudyById(id: string): Promise<IFeasibilityStudy> {
    try {
      const study = await FeasibilityStudy.findById(id);
      if (!study) {
        throw new AppError("Feasibility study not found", 404);
      }
      return study;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to fetch feasibility study", 500);
    }
  }

  // Create new feasibility study
  async createFeasibilityStudy(data: CreateFeasibilityStudyDto): Promise<IFeasibilityStudy> {
    try {
      const study = new FeasibilityStudy(data);
      await study.save();
      return study;
    } catch (error) {
      throw new AppError("Failed to create feasibility study", 500);
    }
  }

  // Update feasibility study
  async updateFeasibilityStudy(id: string, data: UpdateFeasibilityStudyDto): Promise<IFeasibilityStudy> {
    try {
      const study = await FeasibilityStudy.findByIdAndUpdate(
        id,
        { ...data },
        { new: true, runValidators: true }
      );
      
      if (!study) {
        throw new AppError("Feasibility study not found", 404);
      }
      
      return study;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to update feasibility study", 500);
    }
  }

  // Delete feasibility study
  async deleteFeasibilityStudy(id: string): Promise<void> {
    try {
      const study = await FeasibilityStudy.findByIdAndDelete(id);
      if (!study) {
        throw new AppError("Feasibility study not found", 404);
      }
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to delete feasibility study", 500);
    }
  }

  // Get feasibility studies by category
  async getFeasibilityStudiesByCategory(category: string): Promise<IFeasibilityStudy[]> {
    try {
      const studies = await FeasibilityStudy.find({ category }).sort({ createdAt: -1 });
      return studies;
    } catch (error) {
      throw new AppError("Failed to fetch feasibility studies by category", 500);
    }
  }

  // Search feasibility studies
  async searchFeasibilityStudies(query: string): Promise<IFeasibilityStudy[]> {
    try {
      const studies = await FeasibilityStudy.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } }
        ]
      }).sort({ createdAt: -1 });
      
      return studies;
    } catch (error) {
      throw new AppError("Failed to search feasibility studies", 500);
    }
  }
}

export default new FeasibilityStudyService();
