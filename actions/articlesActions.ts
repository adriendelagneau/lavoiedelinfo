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


// export const createArticle = async () => {

//   try {
    
//     const newOne = await Article.create({
//         title: "Ours Polaires, Les Sentinelles du Changement Climatique dans l'Arctique",
//         slug: "ours-polaires-changement-climatique",
//       content: ["Les majestueux ours polaires, emblèmes empreints de la vaste étendue glacée de l'Arctique, se dressent aujourd'hui comme des sentinelles inquiètes face au changement climatique qui bouleverse leur habitat naturel. Au-delà de leur charme puissant et de leur imposante silhouette, ces créatures arctiques incarnent un rôle crucial en tant que gardiens des équilibres écologiques. Cet article plonge dans l'écosystème des ours polaires, mettant en lumière leur statut particulier de sentinelles du changement climatique qui se déroule dans la région la plus septentrionale de notre planète.",
//         "Les ours polaires, maîtres de l'adaptation à l'austérité glacée, dépendent de la banquise pour leur chasse et leur survie. Leur existence est intimement liée à la préservation de cet écosystème fragile. La fonte accélérée des glaces, conséquence directe du réchauffement climatique, menace leur habitat naturel et perturbe leurs habitudes de chasse. Les implications de ces changements transcendent la survie individuelle de l'ours polaire, impactant l'ensemble de la chaîne alimentaire arctique et la biodiversité régionale.",
//         "La chasse, élément vital du quotidien des ours polaires, devient un défi croissant à mesure que la glace fond et que les distances entre les plaques de glace augmentent. La réduction du territoire de chasse combinée à la diminution des proies disponibles met en péril la survie de ces prédateurs de l'Arctique. Ces changements dramatiques exigent une compréhension approfondie des liens entre la fonte des glaces, la disponibilité des phoques et la santé globale des populations d'ours polaires.",
//         "Les ours polaires ne sont pas seulement des victimes du changement climatique, mais également des indicateurs fiables de son étendue. Leur mode de vie et leur dépendance aux conditions de la banquise font d'eux des témoins privilégiés des modifications environnementales rapides et souvent invisibles. En les étudiant, les scientifiques peuvent décrypter les impacts concrets du réchauffement climatique dans l'Arctique et anticiper les répercussions potentielles sur d'autres écosystèmes de la planète.",
//       "Face à cette réalité inquiétante, des initiatives de conservation se multiplient pour protéger les ours polaires et leur habitat. Cependant, l'urgence d'une action mondiale ne saurait être surestimée. La préservation de l'écosystème arctique dépend de notre capacité collective à atténuer le changement climatique et à adopter des pratiques durables. En agissant rapidement et de manière décisive, nous pouvons non seulement sauver les sentinelles de l'Arctique, mais aussi préserver la richesse de la biodiversité qui dépend de leur existence."],
//         category: {
//             id: "65e19fae8bbb02d4debb8441",
//             slug: "ecologie", // You need to replace this with the actual slug
//           },
//           subcategory: {
//               id: "65e19f848bbb02d4debb8420",
//               slug: "international", // You need to replace this with the actual slug
//             },
//             author: "65e19f008bbb02d4debb840c",
//             images: [
//                 { url: "https://res.cloudinary.com/dos8mey8r/image/upload/v1708374346/LeCanard/cute-arctic-mammal-walking-frozen-ice-generated-by-ai_e0sk65.jpg", legend: "Un ours polaire se déplaçant à travers les vastes étendues de neige." },
//                 { url: "https://res.cloudinary.com/dos8mey8r/image/upload/v1708205392/LeCanard/cute-arctic-mammal-walking-frozen-ice-generated-by-ai_2_faukim.jpg", legend: "Un ours polaire se déplaçant à travers les vastes étendues de neige." },
//       ],
//             numberOfViews: 0,
//               createdAt: new Date(),
//             })
//             return true
//           } catch (err) {
//               console.log(err);
//               throw err; // Rethrow the error to handle it at a higher level
//           }
          
          
//           }
          
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
          
          
          
export const createAuthor = async () => {
  await dbConnect()
  try {
    const newAuthor = await Author.create({
      name: "John Doe",
      image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1708205392/LeCanard/cute-arctic-mammal-walking-frozen-ice-generated-by-ai_2_faukim.jpg",
      articles: []
    })
    return true
  } catch (err) {
    console.log(err);
          //       throw err; // Rethrow the error to handle it at a higher level
  }
          }
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          

