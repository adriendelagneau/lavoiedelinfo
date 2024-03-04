"use server"

import Visitor from "@/lib/models/Visitor";

export const handleVisitor = async ({ ip }: { ip: string }) => {
  try {
    // Check if visitor exists
    const existingVisitor = await Visitor.findOne({ ip });

    if (existingVisitor) {
      // Visitor already exists
      const currentTime = new Date();

      // Check if lastIncremented is more than 24 hours ago
      const timeDifference = currentTime.getTime() - existingVisitor.lastIncremented.getTime();
      const hoursDifference = timeDifference / (1000 * 3600); // Convert milliseconds to hours

      if (hoursDifference >= 24) {
        // Reset countOfViews and lastIncremented if more than 24 hours
        existingVisitor.countOfViews = 1;
        existingVisitor.lastIncremented = currentTime;
        await existingVisitor.save();
        console.log('Reset countOfViews and lastIncremented for existing visitor:', existingVisitor);
      } else if (existingVisitor.countOfViews < 3) {
        // Increment countOfViews if less than 3
        existingVisitor.countOfViews += 1;
        existingVisitor.lastIncremented = currentTime; // Update lastIncremented only when countOfViews is less than 3
        await existingVisitor.save();
        console.log('Incremented countOfViews for existing visitor:', existingVisitor);
      } else {
        // countOfViews is already 3 or more, no further increment
        console.log('countOfViews is already 3 or more for existing visitor:', existingVisitor);

        // You can customize the response or take additional actions here
        return { msg: 'Already 3 views' };
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

    return { msg: 'success' };
  } catch (error) {
    console.error('Error in API route:', error);
    return { err: error };
  }
};