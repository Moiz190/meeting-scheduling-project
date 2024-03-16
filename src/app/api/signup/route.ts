import { Users } from '@/models/user';
import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
interface UserPayload {
    name: string,
    email: string,
    password: string,
    availabilityStart: string,
    availabilityEnd: string,
}
export async function POST(request: Request, response: NextApiResponse) {
    try {
        if (request.method !== 'POST') {
            return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
        }
        const payload = await request.json()
        console.log(payload)
        const keys = ['name', 'password', 'email', 'timeAvailabilityStart', 'timeAvailabilityEnd', 'bufferTime', 'dayAvailabilityStart', 'dayAvailabilityEnd']
        const emptyKeys = keys.filter(key => {
            try {

                return !(key.trim() in payload) || payload[key.trim()].trim() === ''
            }
            catch (e) {

                const payloadHasKey = key.trim() in payload;
                // const r = payload[key.trim()].trim() === ''
                console.log(payloadHasKey, key);
                return false

            }
        })
        if (emptyKeys.length > 0) {
            return NextResponse.json({ message: `The following keys are empty: ${emptyKeys.join(", ")}` }, { status: 400 })
        }
        await Users.create({
            name: payload.name,
            email: payload.email,
            password: payload.password,
            timeAvailabilityStart: parseInt(payload.timeAvailabilityStart),
            timeAvailabilityEnd: parseInt(payload.timeAvailabilityEnd),
            dayAvailabilityStart: payload.dayAvailabilityStart,
            dayAvailabilityEnd: payload.dayAvailabilityEnd,
            bufferTime: payload.bufferTime
        })
        const users = await Users.findAll()
        return NextResponse.json({
            type: 'Success',
            message: "User Signed up successfully",
            payload,
            users
        })
    } catch (error) {
        console.log(error)
    }
}