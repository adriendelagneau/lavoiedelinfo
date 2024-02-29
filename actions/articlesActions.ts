'use server'
import { dbConnect } from "@/lib/dbConnect";
import Article from "@/lib/models/Article";
import Author from "@/lib/models/Author";
import { GetArticlesParams, IGetArticlesResponse, TArticle } from "@/types";


export const getArticles = async ({
  page = 1,
  limit = 6,
  query,
  category,
  subcategory,
  sort,
}: GetArticlesParams = {}): Promise<IGetArticlesResponse> => {
  await dbConnect();
  try {
    // Build the filter object based on the provided parameters
    const filter: any = {};
    if (category) {
      filter['category.slug'] = category; // Update to use category.slug
    }
    if (subcategory) {
      filter['subcategory.slug'] = subcategory; // Update to use subcategory.slug
    }

    // Build the search criteria for name, category, and description
    const searchCriteria = query
      ? {
        $or: [
          { title: { $regex: new RegExp(query, 'i') } },
          { slug: { $regex: new RegExp(query, 'i') } },
          { category: { $regex: new RegExp(query, 'i') } },
          { subcategory: { $regex: new RegExp(query, 'i') } },
          { description: { $regex: new RegExp(query, 'i') } },
        ],
      }
      : {};

    // Combine the filter and search criteria
    const combinedFilter = { ...filter, ...searchCriteria };

    // Calculate skipCount
    const skipCount = (page - 1) * limit;

    // Build the sort object based on the provided sort parameter or use default sorting options
    let sortOptions: any = {};
    // if (sort) {
    //   // Implement your sorting logic based on the sort parameter
    //   switch (sort) {
    //     case 'createdAt':
    //       sortOptions.createdAt = 1; // Ascending order
    //       break;
    //     case '-createdAt':
    //       sortOptions.createdAt = -1; // Descending order
    //       break;
    //     // Add more sorting options as needed
    //     default:
    //       break;
    //   }
    // } else {
    //   // Use default sorting (e.g., based on createdAt)
    //   sortOptions.createdAt = -1; // Default: Descending order
    // }

    const result = await Article.find(combinedFilter)
      .skip(skipCount)
      .limit(limit)
      .sort(sortOptions)
      .populate({
        path: 'author',
        select: 'name'
      })
      .lean();

    const totalArticles = await Article.countDocuments(combinedFilter);
    const totalPages = Math.ceil(totalArticles / limit);

    // Convert MongoDB objects to plain objects
    const plainObject = JSON.parse(JSON.stringify(result));

    // Return the articles along with total pages
    return { data: plainObject, totalPages };
  } catch (err) {
    console.error('Error in getArticles:', err);
    throw new Error('An unexpected error occurred while fetching articles.');
  }
};




export const getArticleBySlug = async (slug: string): Promise<TArticle> => {
  await dbConnect();

  try {
    // Use Mongoose findOne to retrieve an article by its slug
    const article = await Article.findOne({ slug })
      .populate({
        path: 'category',
        select: 'name'
      })
      .populate({
        path: 'author', // Assuming 'author' is the field in the Article schema
        select: 'name image' // Select the fields you want to populate
      })
      .lean()
      .exec();

    // If the article is not found, you may want to handle this case accordingly
    if (!article) {
      throw new Error("Article not found");
    }

    // Convert the MongoDB object to a plain JavaScript object
    const plainObject = JSON.parse(JSON.stringify(article));

    // Return the article as a plain object
    return plainObject;
  } catch (err) {
    console.log(err);
    throw err; // Rethrow the error to handle it at a higher level
  }
};


export const getArticleById = async (id: string): Promise<TArticle> => {
  await dbConnect();

  try {
    // Use Mongoose findById to retrieve a product by its ID
    const article = await Article.findById(id).populate({
      path: 'category',
      select: 'name'
    }).lean().exec();

    // If the product is not found, you may want to handle this case accordingly
    if (!article) {
      throw new Error("Product not found");
    }

    // Convert the MongoDB object to a plain JavaScript object
    const plainObject = JSON.parse(JSON.stringify(article));

    // Return the product as a plain object
    return plainObject;
  } catch (err) {
    console.log(err);
    throw err; // Rethrow the error to handle it at a higher level
  }
};

