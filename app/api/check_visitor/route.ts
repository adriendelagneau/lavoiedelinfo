import Visitor from "@/lib/models/Visitor";

export async function POST(req: Request) {
    try {
        const data = await req.json()
    
        console.log(data.ip, "dataip")
        
        const visitor = await Visitor.findOne({ ip: data.ip })
        console.log(visitor, "ww")
        
    } catch (err) {
        console.log(err)
  }
 

   
    return new Response("This is a new API route");
  }