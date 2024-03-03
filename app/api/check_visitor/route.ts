import Visitor from "@/lib/models/Visitor";


export async function POST(req: Request) {
    try {
      const { ip } = await req.json();
  
      // Check if visitor exists
      const existingVisitor = await Visitor.findOne({ ip });
  
      if (existingVisitor) {
        const now = new Date();
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
        // If lastIncremented is more than 24 hours ago, reset the counter
        if (!existingVisitor.lastIncremented || existingVisitor.lastIncremented < twentyFourHoursAgo) {
          existingVisitor.countOfViews = 1;
          existingVisitor.lastIncremented = now;
        } else {
          // Increment countOfViews if lastIncremented is within the last 24 hours
          existingVisitor.countOfViews += 1;
        }
  
        await existingVisitor.save();
        console.log('Visitor data:', existingVisitor);
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
  
      return new Response("Visitor check and creation completed successfully");
    } catch (error) {
      console.error('Error in API route:', error);
      return new Response("Internal Server Error", { status: 500 });
    }
  }