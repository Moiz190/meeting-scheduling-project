import { NextApiResponse } from "next"
import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
    try {
        await cookies().set('token', '')
        return NextResponse.json({
            type: 'Success',
            code: 200
        });
    } catch (e) {
        return NextResponse.json({
            message: e ?? "Unexpected Server error",
        }, {
            status:
                500
        });
    }
}