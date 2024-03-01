'use server'

import { dbConnect } from "@/lib/dbConnect";
import Category from "@/lib/models/Category";
import Subcategory from "@/lib/models/Subcategory";


const BASE_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;

export const getCategories = async () => {

  try {
      await dbConnect()
      const categoriesWithSubcategories = await Category.find().populate({
        path: 'sub',
        model: 'Subcategory',
        select: 'name'
      }).lean().exec();
        return JSON.parse(JSON.stringify(categoriesWithSubcategories)) ;
      } catch (error) {
        console.error("Error fetching categories with subcategories:", error);
        throw error;
      }
};

export const getCategoryByName = async (name: string) => {
  try {
    await dbConnect();
    const res = await Category.findOne({ name })
      .populate({
        path: 'sub',
        model: 'Subcategory',
        select: 'name',
      })
      .exec();
    return JSON.parse(JSON.stringify(res));
  } catch (err) {
    console.error("Error fetching category by name:", err);
    return { error: "An error occurred while fetching the category." };
  }
}

export const createSub = async () => {
  try {
    const newSub = await Subcategory.create({
      name:"international"
    })
    return {msg: "success"}
  } catch (err) {
    console.log(err)
  }
}

export const createCat = async () => {
  try {
    const newCCat = await Category.create({
      name: "ecologie",
      sub: ["65e19f848bbb02d4debb8420"]
    })
    return {msg: "success"}
  } catch (err) {
    console.log(err)
  }
}