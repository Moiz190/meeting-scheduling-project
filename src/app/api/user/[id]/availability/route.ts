import { NextResponse } from 'next/server';
import { Users } from "@/models/user"
import { NextApiRequest, NextApiResponse } from "next"
import { UserAvailability } from '@/models/userAvailability';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const user_id = params.id
        if (!params.id) {
            NextResponse.json({
                message: 'id is required',
            }, { status: 400 })
        }
        const user = await UserAvailability.findAll({
            where: { user_id }
        })
        return NextResponse.json({
            data: user,
            type: 'Success',
            code: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: error
        }, { status: 500 })
    }
}