"use client"
import React, { useEffect, useState } from 'react'
import MultiSelect from '@/components/common/MultiSelect'
import Button from '@/components/common/Button'
import { makeApiCall } from '@/utils/makeApiCall'
import { IGenericReponse, IUser } from '@/types'
import { IMeetings } from '@/types/meeting'
const Meeting = () => {
    const [userRecords, setUserRecords] = useState<IUser[]>([])
    const [scheduledMeetings, setScheduledMeetings] = useState<IMeetings[]>([])
    const [newMeeting, setNewMeeting] = useState<IMeetings>({
        user: null,
        startTime: '',
        endTime: '',
        day:0,
        
    })
    const [isFetchingUserRecords, setIsFetchingUserRecords] = useState(false)
    useEffect(() => {
        fetchUserRecords()
    }, [])
    const fetchUserRecords = async () => {
        try {
            setIsFetchingUserRecords(true)
            const response = await makeApiCall<IGenericReponse<IUser[]>>({
                endpoint: "user",
                method: "GET",
            })
            if (response.type === "Success") {
                setUserRecords(response.data)
            }
        } catch (e) {
            console.error(e)
        }
        setIsFetchingUserRecords(false)
    }
    const handleSelectMeetingUser = (event: IUser[]) => {
        setNewMeeting(oldValue => ({
        ...oldValue, user: event[0].id
        }))
    }
    const handleSelectMeetingDate = (event: IUser[]) => {
        setNewMeeting(oldValue => ({
        ...oldValue,day: event[0].dayAvailabilityStart
        }))
    }
    const handleSelectMeetingTime = (event: IUser[]) => {
        setNewMeeting(oldValue => ({
        ...oldValue, startTime: event[0].timeAvailabilityStart
        }))
    }
    const time = [
        { name: 'time 1 - time 2', id: 1 },
        { name: 'time 2 - time 3', id: 2 },
        { name: 'time 3 - time 4', id: 3 },
        { name: 'time 4 - time 5', id: 4 },
        { name: 'time 5 - time 6', id: 5 },
        { name: 'time 6 - time 7', id: 6 },
        { name: 'time 7 - time 8', id: 7 }
    ]
    return (
        <div className="h-screen p-2 min-w-[300px] flex flex-col items-center justify-center bg-black gap-10">
            <div className="font-semibold text-center text-white text-3xl"><span>Schedule a Meeting</span></div>
            <div className="flex gap-10 h-[400px] max-w-[900px] w-full justify-center">
                <div className='p-3 min-w-[305px] max-w-[400px] w-full bg-[#5c7481ab] rounded-lg'>
                    <div className='mb-2'>
                        <div className="text-lg mb-1">
                            <span>
                                Select a User for meeting
                            </span>
                        </div>
                        <MultiSelect className={'w-full'} label='select user' isLoading={isFetchingUserRecords} singleSelect={true} onChange={handleSelectMeetingUser} options={userRecords} />
                    </div>
                    <div className='mb-2'>
                        <div className="text-lg mb-1">
                            <span>
                                Select Date for meeting
                            </span>
                        </div>
                        <MultiSelect className={'w-full'} label='Available Date' singleSelect={true} onChange={handleSelectMeetingDate} options={time} />
                    </div>
                    <div>
                        <div className="text-lg mb-1">
                            <span>
                                Select Time for meeting
                            </span>
                        </div>
                        <MultiSelect className={'w-full'} label='Available Timeslot' singleSelect={true} onChange={handleSelectMeetingTime} options={time} />
                    </div>

                </div>
                <div className='min-w-[305px] max-w-[400px] w-full bg-[#5c7481ab] rounded-lg p-3'>
                    <div className="text-lg text-center mb-1">
                        <span>Scheduled Meetings</span>
                    </div>
                    {
                        scheduledMeetings.length === 0
                            ? <div className='text-center text-sm mt-12'><span>There are no Scheduled Meetings</span></div>
                            :
                            scheduledMeetings.map(meeting =>
                            (<div key={meeting.user} className='flex flex-col gap-2 max-h-[340px] h-full overflow-auto px-1'>
                                <div className="flex text-sm items-center justify-between bg-white text-black py-1 px-2 rounded-md">
                                    <div className='p-1'>
                                        <span>{meeting.user}</span>
                                    </div>
                                    <div>
                                        <span>{meeting.startTime} - {meeting.endTime}</span>
                                    </div>
                                    <Button label='Cancel' className='p-0.5 w-16 text-xs' />
                                </div>
                            </div>
                            )
                            )
                    }
                </div>
            </div>
            <Button label='Schedule' variant='secondary' className='border-2 border-transparent' />
        </div>
    )
}
export default Meeting