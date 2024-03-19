import { UserMeeting } from "@/models/meetingUserRelationship"
import { Meetings } from "@/models/meetings"
import { IMeetingPayload } from "@/types/meeting"
import { NextApiResponse } from "next"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params
        if (!id) {
            return NextResponse.json({
                message: 'id is required'
            }, { status: 400 })
        }
        const meetingRecords = await Meetings.findAll({
            attributes: ['id', 'meeting_start', 'meeting_end'],
        });
        return NextResponse.json({
            data: meetingRecords,
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
        const payload = await req.json() as IMeetingPayload
        if (!payload.target_user || payload.target_user < 0 || payload.target_user) {
            return NextResponse.json({
                message: 'target_user is required'
            }, { status: 400 })
        }
        if (!payload.source_user || payload.source_user < 0 || payload.source_user) {
            return NextResponse.json({
                message: 'target_user is required'
            }, { status: 400 })
        }
        if (!payload.startTime || payload.startTime < 0) {
            return NextResponse.json({
                message: 'startTime is required'
            }, { status: 400 })
        }
        if (!payload.endTime || payload.endTime < 0) {
            return NextResponse.json({
                message: 'endTime is required'
            }, { status: 400 })
        }
        if (payload.startTime > payload.endTime) {
            return NextResponse.json({
                message: 'startTime cannot be greater than endTime'
            }, { status: 400 })
        }
        const newMeeting = {
            startTime: payload.startTime,
            endTime: payload.endTime
        }
        const response = await Meetings.create(newMeeting)
        const userMeetingPayload = {
            target_user_id: payload.target_user,
            source_user_id: payload.source_user,
            meeting_id: response.dataValues.id
        }
        await UserMeeting.create(userMeetingPayload)
        return NextResponse.json({
            message: 'Meeting Added',
            code: 201,
            type: "Success",
        })
    } catch (e) {
        return NextResponse.json({
            message: e
        }, { status: 500 })
    }
}