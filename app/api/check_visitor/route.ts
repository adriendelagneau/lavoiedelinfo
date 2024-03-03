import Visitor from "@/lib/models/Visitor";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { ip } = await req.json();
    
      
        
        const visitor = await Visitor.findOne({ ip })
        console.log(visitor, "ww")
        if (!visitor) {
            const newVisitor =  Visitor.create({
                ip,
                countOfViews: 1
            })
        }
    } catch (err) {
        console.log(err)
  }
 

   
    return new Response("This is a new API route");
  }