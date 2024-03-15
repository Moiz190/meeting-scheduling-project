
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse,NextRequest } from "next/server";

export async function POST(request: Request, response: NextApiResponse) {
    try {
        console.log(request.body,'thisi  ')
        const { name, password } = await request.json()
        console.log(name,password)
        return NextResponse.json({
            message: { name, password },
            type: 'Success'
        })
    } catch (error) {
        return NextResponse.json({
            code: 400,
            message: 'error'
        })
    }
}