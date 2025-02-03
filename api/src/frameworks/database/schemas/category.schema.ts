import { v4 as uuidv4 } from "uuid";
import { Schema } from "mongoose";
import { CategoryModel, ICategoryModel } from "../models/category.model";

export const CategorySchema = new Schema<ICategoryModel>({
  categoryId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
});

CategorySchema.pre<ICategoryModel>("save", async function (next) {
  if (!this.categoryId) {
    let newId;
    let exists;
    do {
      newId = uuidv4();
      exists = await CategoryModel.exists({ categoryId: newId });
    } while (exists);

    this.categoryId = newId;
  }
  next();
});
