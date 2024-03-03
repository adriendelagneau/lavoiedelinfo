import Visitor from "@/lib/models/Visitor";

export async function POST(req: Request) {
    try {
        const data = await req.json()
    
      
        
        const visitor = await Visitor.findOne({ ip: data.ip })
        console.log(visitor, "ww")
        if (!visitor) {
            const newVisitor = await Visitor.create({
                ip: data.ip,
                countOfViews: 1
            })
        }
    } catch (err) {
        console.log(err)
  }
 

   
    return new Response("This is a new API route");
  }