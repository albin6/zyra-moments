import { Document, model } from "mongoose";
import { CategorySchema } from "../schemas/category.schema";

export interface ICategoryModel extends Document {
  categoryId: string;
  title: string;
}

export const CategoryModel = model<ICategoryModel>("Category", CategorySchema);
