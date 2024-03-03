import Visitor from "@/lib/models/Visitor";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request) {
  
    const data = await req.json()
console.log(data.ip, "dataip")
    const visitor = await Visitor.findOne({ ip: data.ip })
    console.log(visitor, "ww")
    if (!visitor) {
        const newVisitor = await Visitor.create({
            ip: data.ip,
            countOfViews: 1
        })
    }

   
    return new Response("This is a new API route");
  }