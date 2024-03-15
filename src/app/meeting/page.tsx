"use client"
import React, { ChangeEvent } from 'react'
import MultiSelect from '@/components/common/MultiSelect'
import Button from '@/components/common/Button'
const Meeting = () => {
    const users = ['user 1', 'user 2', 'user 3', 'user 4', 'user 5', 'user 6', 'user 7']
    const time = ['time 1 - time 2', 'time 2 - time 3', 'time 3 - time 4', 'time 4 - time 5', 'time 5 - time 6', 'time 6 - time 7', 'time 7 - time 8']
    return (
        <div className="h-screen p-2 min-w-[300px] flex flex-col items-center justify-center bg-black gap-10">
            <div className="font-semibold text-center text-white text-3xl"><span>Schedule a Meeting</span></div>
            <div className="flex gap-10 h-[400px]">
                <div className='min-w-[305px] max-w-[350px] w-full bg-[#5c7481ab] rounded-lg'>
                </div>
                <div className='p-3 min-w-[305px] max-w-[350px] w-full bg-[#5c7481ab] rounded-lg'>
                    <div className='mb-2'>
                        <div className="text-lg mb-1">
                            <span>
                                Select a User for meeting
                            </span>
                        </div>
                        <MultiSelect className={'w-full'} label='select user' singleSelect={true} onChange={(e) => console.log(e)} options={users} />
                    </div>
                    <div className='mb-2'>
                        <div className="text-lg mb-1">
                            <span>
                                Select Date for meeting
                            </span>
                        </div>
                        <MultiSelect className={'w-full'} label='Available Date' singleSelect={true} onChange={(e) => console.log(e)} options={time} />
                    </div>
                    <div>
                        <div className="text-lg mb-1">
                            <span>
                                Select Time for meeting
                            </span>
                        </div>
                        <MultiSelect className={'w-full'} label='Available Timeslot' singleSelect={true} onChange={(e) => console.log(e)} options={time} />
                    </div>
                    
                </div>
            </div>
            <Button label='Schedule' variant='secondary' className='border-2 border-transparent' />
        </div>
    )
}
export default Meeting