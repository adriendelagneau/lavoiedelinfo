import Visitor from "@/lib/models/Visitor";


export async function POST(req: Request) {
    try {
      const { ip } = await req.json();
  
      // Check if visitor exists
      const existingVisitor = await Visitor.findOne({ ip });
  
      if (existingVisitor) {
        // Visitor already exists
        if (existingVisitor.countOfViews < 3) {
          // Increment countOfViews if less than 3
          existingVisitor.countOfViews += 1;
          existingVisitor.lastIncremented = new Date(); // Update lastIncremented only when countOfViews is less than 3
          await existingVisitor.save();
          console.log('Incremented countOfViews for existing visitor:', existingVisitor);
        } else {
          // countOfViews is already 3 or more, no further increment
          console.log('countOfViews is already 3 or more for existing visitor:', existingVisitor);
  
          // You can customize the response or take additional actions here
          return new Response(JSON.stringify({ message: "Allready 3 views" }))
        }
      } else {
        // Visitor does not exist, create a new one
        const newVisitor = await Visitor.create({
          ip,
          countOfViews: 1,
          lastIncremented: new Date(),
          // Add other properties as needed
        });
  
        console.log('New Visitor:', newVisitor);
      }
  
      return new Response(JSON.stringify({ message: "This is a new API route" }))
    } catch (error) {
      console.error('Error in API route:', error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }))
    }
  }