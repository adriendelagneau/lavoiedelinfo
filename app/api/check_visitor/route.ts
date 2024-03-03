import Visitor from "@/lib/models/Visitor";

export async function POST(req: Request) {
    try {
      const { ip } = await req.json();
  
      // Check if visitor exists
      const existingVisitor = await Visitor.findOne({ ip });
  
      if (existingVisitor) {
        if (existingVisitor.numberOfViews < 3) {
            // Increment numberOfViews if less than 3
            existingVisitor.numberOfViews += 1;
            await existingVisitor.save();
            console.log('Incremented numberOfViews for existing visitor:', existingVisitor);
          } else {
            // Perform a different action if numberOfViews is 3 or more
            console.log('numberOfViews is already 3 or more for existing visitor:', existingVisitor);
            // Add your logic here
          }
  
      } else {
        // Visitor does not exist, create a new one
        const newVisitor = await Visitor.create({
          ip,
          countOfViews: 1,
        });
  
        console.log('New Visitor:', newVisitor);
      }
  
      return new Response("Visitor check and creation completed successfully");
    } catch (error) {
      console.error('Error in API route:', error);
      return new Response("Internal Server Error", { status: 500 });
    }
  }