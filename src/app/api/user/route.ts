import { NextResponse } from 'next/server';
import { Users } from "@/models/user"
import { NextApiResponse } from "next"

export async function GET(request: Request, response: NextApiResponse) {
    try {

        const userRecords = await Users.findAll()
        return NextResponse.json({
            data: userRecords,
            type: 'Success',
            code: 200
        })
    } catch (error) {
        console.error(error)
    }
}