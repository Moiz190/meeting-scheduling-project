"use client"
import React, { useState } from 'react'
import Button from '@/components/common/Button'
import { IGenericReponse } from '@/types'
import { makeApiCall } from '@/utils/makeApiCall'
import { useRouter } from 'next/navigation'

const Availability = () => {
    const [isLoading, setIsLoading] = useState(false)
    const router =useRouter()
    const handleLogout = async () => {
        try {
            setIsLoading(true)
            const res = await makeApiCall<IGenericReponse<null>>({ endpoint: 'logout', method: 'POST' })
            if (res.type === 'Success') {
                router.push('/login')
            }
        } catch (e) {
            console.error(e)
        }
        setIsLoading(false)
    }
  return (
    <div className="h-screen p-2 min-w-[300px] flex flex-col items-center justify-center bg-black gap-10">
            <div className='w-full flex justify-end'>
                <Button className='text-sm !w-20' onClick={handleLogout} label='Logout' variant='secondary' loading={isLoading} />
            </div>
            <div className="font-semibold text-center text-white text-3xl"><span>Schedule a Meeting</span></div>
            <div className="flex gap-10 h-[400px] max-w-[900px] w-full justify-center">
                <div className='p-3 min-w-[305px] max-w-[400px] w-full bg-[#5c7481ab] rounded-lg'>
                    <div className='mb-2'>
                        <div className="text-lg mb-1">
                            <span>
                                Select a User for meeting
                            </span>
                        </div>
                        {/* <MultiSelect className={'w-full'} label='select user' isLoading={isFetchingUserRecords} singleSelect={true} onChange={handleSelectMeetingUser} options={userRecords} /> */}
                    </div>
                    <div className='mb-2'>
                        <div className="text-lg mb-1">
                            <span>
                                Select Day for meeting
                            </span>
                        </div>
                        {/* <MultiSelect className={'w-full'} label='Available Days' isLoading={isFetchingDateRecords} singleSelect={true} onChange={handleSelectMeetingDate} options={dateRecords}
                            optionLabel={'available_day_start'} isDay={true} optionLabel2={'available_day_end'}
                        /> */}
                    </div>
                    <div>
                        <div className="text-lg mb-1">
                            <span>
                                Select Time for meeting
                            </span>
                        </div>
                        {/* <MultiSelect className={'w-full'} label='Available Timeslot' isLoading={isFetchingDateRecords} singleSelect={true} optionLabel='available_time_start' optionLabel2='available_time_end' onChange={handleSelectMeetingTime} options={dateRecords} /> */}
                    </div>

                </div>
                <div className='min-w-[305px] max-w-[400px] w-full bg-[#5c7481ab] rounded-lg p-3'>
                    <div className="text-lg text-center mb-1">
                        <span>Scheduled Meetings</span>
                    </div>
                    {/* {
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
                            ))} */}
                </div>
            </div>
            <Button label='Schedule' variant='secondary' className='border-2 border-transparent' />
        </div>
  )
}
export default Availability