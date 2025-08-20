import { z } from "zod";

export const createFeasibilityStudySchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string"
  }).min(3, "Name must be at least 3 characters long"),
  
  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "Description must be a string"
  }).min(10, "Description must be at least 10 characters long"),
  
  image: z.string({
    required_error: "Image URL is required",
    invalid_type_error: "Image URL must be a string"
  }).url("Image must be a valid URL"),
  
  price: z.string({
    required_error: "Price is required",
    invalid_type_error: "Price must be a string"
  }).min(1, "Price is required"),
  
  category: z.string({
    required_error: "Category is required",
    invalid_type_error: "Category must be a string"
  }).min(2, "Category must be at least 2 characters long")
});

export const updateFeasibilityStudySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").optional(),
  description: z.string().min(10, "Description must be at least 10 characters long").optional(),
  image: z.string().url("Image must be a valid URL").optional(),
  price: z.string().min(1, "Price is required").optional(),
  category: z.string().min(2, "Category must be at least 2 characters long").optional()
});

export const feasibilityStudyIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format")
});

export const searchFeasibilityStudySchema = z.object({
  q: z.string().min(1, "Search query is required")
});
