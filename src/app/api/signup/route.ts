import { Users } from '@/models/user';
import { UserAvailability } from '@/models/userAvailability';
import { ISignupPayload, IUserAvailability } from '@/types';
import { NextApiResponse } from 'next';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
export async function POST(request: Request, response: NextApiResponse) {
    try {
        if (request.method !== 'POST') {
            return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
        }
        const payload = await request.json() as ISignupPayload
        const keys = [' name', ' password', ' email', ' timeAvailabilityStart', ' timeAvailabilityEnd', ' bufferTime', ' dayAvailabilityStart', ' dayAvailabilityEnd']
        const emptyKeys = keys.filter(key => !(key.trim() in payload))
        if (emptyKeys.length > 0) {
            return NextResponse.json({ message: `The following keys are empty: ${emptyKeys}` }, { status: 400 })
        }
        const userPayload = { name: payload.name, email: payload.email, password: payload.password }
        const response = await Users.create(userPayload)

        const userAvailabilityPayload: Omit<IUserAvailability, "createdAt" | "updatedAt"> = {
            user_id: response.dataValues.id,
            available_day_start: payload.dayAvailabilityStart.id,
            available_day_end: payload.dayAvailabilityEnd.id,
            buffer_time: payload.bufferTime,
            available_time_end: payload.timeAvailabilityEnd,
            available_time_start: payload.timeAvailabilityStart,
        }
        await UserAvailability.create(userAvailabilityPayload)
        cookies().set('token',response.dataValues.id.toString())
        return NextResponse.json({
            type: 'Success',
            message: "User Signed up successfully",
            payload,
        })
    } catch (error) {
        console.log(error)
    }
}