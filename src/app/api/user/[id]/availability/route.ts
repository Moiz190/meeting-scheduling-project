import { NextResponse } from 'next/server';
import { Users } from "@/models/user"
import { NextApiRequest, NextApiResponse } from "next"
import { UserAvailability } from '@/models/userAvailability';

interface IUserAvailability {
    user_id: string;
    buffer_time: number;
    available_day_start: { name: string; id: number };
    available_day_end: { name: string; id: number };
    available_time_start: string;
    available_time_end: string;
    max_meetings: number;
}
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
export async function POST(req: Request, res: NextApiResponse) {
    try {
        const response = await req.json() as IUserAvailability
        console.log(response.max_meetings ===0,response.max_meetings)
        if (!response.user_id) {
            return NextResponse.json({
                message: 'user_id is required',
            }, { status: 400 })
        }
        if (response.available_day_end < response.available_day_start) {
            return NextResponse.json({
                message: 'available_day_start cannot be greater than available_day_end',
            }, { status: 400 })
        }
        if (response.max_meetings <= 0 ) {
            return NextResponse.json({
                message: 'max_meeting atleast have to be 1',
            }, { status: 400 })
        }
        if (!response.available_day_end || !response.available_day_start) {
            return NextResponse.json({
                message: 'weekly availability is required',
            }, { status: 400 })
        }
        const payload = {
            ...response,
            available_day_start: response.available_day_start.id,
            available_day_end: response.available_day_end.id,
        }
        await UserAvailability.create(payload)
        const data = await UserAvailability.findAll()
        return NextResponse.json({
            message: 'Availability Added',
            code: 200,
            type: "Success",
            data
        })
    } catch (e) {
        return NextResponse.json({
            message: e
        }, { status: 500 })
    }
}