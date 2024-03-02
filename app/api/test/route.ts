import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import requestIp from 'request-ip'
// export async function GET(req: NextRequest) {
//   const ip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0].replace('::ffff:', '');
//   return NextResponse.json({ ip });
// }

export async function GET(req: NextApiRequest) {
  const ip = requestIp.getClientIp(req)
  console.log(ip)
  return NextResponse.json({ ip });
}