import Visitor from "@/lib/models/Visitor";

export async function POST(req: Request) {
  
    const {ip} = await req.json()
    console.log(ip)
    const visitor = await Visitor.findOne({ ip })
    if (!visitor) {
        const newVisitor = await Visitor.create({
            ip,
            countOfViews: 1
        })
    }

   
    return new Response("This is a new API route");
  }