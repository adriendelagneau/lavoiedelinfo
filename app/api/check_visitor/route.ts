import Visitor from "@/lib/models/Visitor";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { ip } = await req.json();
  
        // Check if visitor exists
        const existingVisitor = await Visitor.findOne({ ip });
  
      if (!existingVisitor) {
        // Create a new visitor and wait for it to be created
        const newVisitor = await Visitor.create({
          ip,
          countOfViews: 1,
        });
  
        console.log(newVisitor, "New Visitor Created");
      }
  
      return new Response(JSON.stringify({ message: "This is a new API route" }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error processing POST request:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }