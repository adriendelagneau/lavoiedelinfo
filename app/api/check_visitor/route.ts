import Visitor from "@/lib/models/Visitor";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
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
 

   
    return NextResponse.json("This is a new API route");
  }