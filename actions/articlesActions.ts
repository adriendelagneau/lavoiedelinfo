'use server'
import { dbConnect } from "@/lib/dbConnect";
import Article  from "@/lib/models/Article";
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
  try {
    await dbConnect();
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
        select: 'name',
        model: 'Author',
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
  
  try {
    await dbConnect();
    // Use Mongoose findOne to retrieve an article by its slug
    const article = await Article.findOne({ slug })
      .populate({
        path: 'category',
        select: 'name',
        model: 'Category',
      })
      .populate({
        path: 'author', // Assuming 'author' is the field in the Article schema
        select: 'name image', // Select the fields you want to populate
        model: 'Author',
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


export const createArticle = async () => {

  try {
    
    const newOne = await Article.create({
        title: "Sample Article",
        slug: "a-readable-title",
        content: ["Lorem ipsum dolor sit amet. Consectetur adipiscing elit.","Lorem ipsum dolor sit amet. Consectetur adipiscing elit.","Lorem ipsum dolor sit amet. Consectetur adipiscing elit.","Lorem ipsum dolor sit amet. Consectetur adipiscing elit."],
        category: {
            id: "65e0b29541dd91604a57cb1e",
            slug: "ecologie", // You need to replace this with the actual slug
          },
          subcategory: {
              id: "65e0dd9ca38ef2c88cfa3196",
              slug: "international", // You need to replace this with the actual slug
            },
            author: "65e1778d83015622adda1a0e",
            images: [
                { url: "https://res.cloudinary.com/dos8mey8r/image/upload/v1708374346/LeCanard/cute-arctic-mammal-walking-frozen-ice-generated-by-ai_e0sk65.jpg", legend: "Image 1" },
                { url: "https://res.cloudinary.com/dos8mey8r/image/upload/v1708205392/LeCanard/cute-arctic-mammal-walking-frozen-ice-generated-by-ai_2_faukim.jpg", legend: "Image 2" },
      ],
            numberOfViews: 0,
              createdAt: new Date(),
            })
            return true
          } catch (err) {
              console.log(err);
              throw err; // Rethrow the error to handle it at a higher level
          }
          
          
          }
          
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



          export const increaseViewsById = async (id: string): Promise<TArticle | null> => {
            await dbConnect();
        
            try {
                // Use Mongoose findByIdAndUpdate to find and update the article by its ID
                const updatedArticle = await Article.findByIdAndUpdate(
                    id,
                    { $inc: { numberOfViews: 1 } }, // Increment the numberOfViews field by 1
                    { new: true, runValidators: true }
                ).lean().exec();
        
                // If the article is not found, you may want to handle this case accordingly
                if (!updatedArticle) {
                    throw new Error("Article not found");
                }
        
                // Convert the MongoDB object to a plain JavaScript object
                const plainObject = JSON.parse(JSON.stringify(updatedArticle));
        
                // Return the updated article as a plain object
                return plainObject;
            } catch (err) {
                console.error(err);
                throw err; // Rethrow the error to handle it at a higher level
            }
        };
          
          
          
// export const createAuthor = async () => {
//   await dbConnect()
//   try {
//     const newAuthor = await Author.create({
//       name: "John Doe",
//       image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1708205392/LeCanard/cute-arctic-mammal-walking-frozen-ice-generated-by-ai_2_faukim.jpg",
//       articles: []
//     })
//     return true
//   } catch (err) {
//     console.log(err);
//           //       throw err; // Rethrow the error to handle it at a higher level
//   }
//           }
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          





// export const createArticle = async () => {
//     try {
//       const newArticle: TArticle = await Article.create({
//         title: "Sample Article",
//         content: ["Lorem ipsum content"],
//         category: "65cf8f87c472cd33efbc9c88",
//         author: "John Doe",
//         images: [{url : "https://res.cloudinary.com/dos8mey8r/image/upload/v1708163477/LeCanard/cute-arctic-mammal-walking-frozen-ice-generated-by-ai_nuwyj0.jpg", legend: "une description imagée de la photos"}],
//       });
  
//       return { msg: "success", article: newArticle };
//     } catch (err) {
//       console.error(err);
//       return { msg: "error", error: err.message };
//     }
// };


