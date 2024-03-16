"use client";
import React, { useState } from "react";
import TimeRangePicker from '@/components/common/TimeRangePicker'
import Link from "next/link";
import { IGenericReponse, ISignupCredential, IToaster } from "@/types";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { makeApiCall } from "@/utils/makeApiCall";
import { Toaster } from "@/components/common/Toaster";
import { useRouter } from "next/navigation";
import MultiSelect from '@/components/common/MultiSelect'
import { days } from "./utils";
const Signup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [toaster, setToaster] = useState<IToaster>({
        message: '',
        isVisible: false,
        type: 'positive',
    })
    const [signupCreds, setSignupCreds] = useState<ISignupCredential>({
        name: "",
        password: "",
        email: "",
        bufferTime: "00:00",
        dayAvailabilityStart: "",
        dayAvailabilityEnd: "",
        timeAvailabilityStart: "00:00",
        timeAvailabilityEnd: "00:00",

    });
    const router = useRouter()
    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignupCreds((oldValue) => ({
            ...oldValue,
            name: event.target.value,
        }));
    };
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignupCreds((oldValue) => ({
            ...oldValue,
            email: event.target.value,
        }));
    };
    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignupCreds((oldValue) => ({
            ...oldValue,
            password: event.target.value,
        }));
    };

    const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newStartTime = event.target.value
        // if (newStartTime <= signupCreds.availabilityEnd) {
        // }
        setSignupCreds((oldValue) => ({
            ...oldValue,
            availabilityStart: event.target.value,
        }));
    };

    const handleEndDayChange = (event: string[]) => {
        setSignupCreds((oldValue) => ({
            ...oldValue,
            dayAvailabilityEnd: event[0],
        }));
    };

    const handleStartDayChange = (event: string[]) => {
        setSignupCreds((oldValue) => ({
            ...oldValue,
            dayAvailabilityStart: event[0],
        }));
    };

    const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // const newEndTime = event.target.value
        // if(newEndTime >= signupCreds.availabilityStart){
        // }
        setSignupCreds((oldValue) => ({
            ...oldValue,
            availabilityEnd: event.target.value,
        }));
    };
    const handleBufferTime = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignupCreds((oldValue) => ({
            ...oldValue,
            bufferTime: event.target.value,
        }));
    }
    const handleSignup = async () => {
        try {
            setIsLoading(true)
            const response = await makeApiCall<IGenericReponse<null>>({
                endpoint: 'signup',
                method: 'POST',
                data: signupCreds
            })
            if (response.type === 'Success') {
                setToaster({ type: 'positive', isVisible: true, message: response.message })
                router.push('/meeting')
            }
        } catch (error) {
            console.log(error)
            // setToaster({isVisible:true,message:error,type:'negative'})
        }
        setIsLoading(false)
        setTimeout(() => {
            setToaster(oldValue => ({ ...oldValue, isVisible: false }))
        }, 3000)
    };
    return (
        <div className="h-screen p-2 md:p-4 grid grid-col-1 md:grid-cols-2">
            <div className="hidden md:block"></div>
            <div className="flex justify-center items-center">
                <div className="flex flex-col bg-[#5c7481ab] dark:bg-[#f4f5f6ab] shadow-lg p-5 rounded-lg
        min-w-[305px] w-full max-w-[350px]">
                    <div>
                        <div className="text-center dark:text-white text-black font-medium text-2xl py-4 mb-4">
                            <span>Signup Page</span>
                        </div>
                        <div className="flex flex-col gap-2 mb-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium dark:text-white text-black"
                                >
                                    Name
                                </label>
                                <InputField
                                    label="Name"
                                    type="text"
                                    id="name"
                                    value={signupCreds.name}
                                    onChange={handleChangeName}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium dark:text-white text-black"
                                >
                                    Email
                                </label>
                                <InputField
                                    label="Email"
                                    type="email"
                                    id="email"
                                    value={signupCreds.email}
                                    onChange={handleChangeEmail}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium dark:text-white text-black"
                                >
                                    Password
                                </label>
                                <InputField
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={signupCreds.password}
                                    onChange={handleChangePassword}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="availableTime"
                                    className="block mb-2 text-sm font-medium dark:text-white text-black"
                                >
                                    Select Your Weekly Availability
                                </label>
                                <div className="flex items-center space-x-4">
                                    <MultiSelect className="w-full max-w-[130px]" optionsWidth='w-20' label="From" singleSelect={true} options={days} onChange={handleStartDayChange} />
                                    <span>to</span>
                                    <MultiSelect className="w-full max-w-[130px]" optionsWidth='w-20' label="To" singleSelect={true} options={days} onChange={handleEndDayChange} />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="availableTime"
                                    className="block mb-2 text-sm font-medium dark:text-white text-black"
                                >
                                    Select Your Time Availability
                                </label>
                                <TimeRangePicker id={'availableTime'} startTime={signupCreds.timeAvailabilityStart} onStartTimeChange={handleStartTimeChange} onEndTimeChange={handleEndTimeChange} endTime={signupCreds.timeAvailabilityEnd} />
                            </div>
                            <div>
                                <label
                                    htmlFor="availableTime"
                                    className="block mb-2 text-sm font-medium dark:text-white text-black"
                                >
                                    Select Your Buffer Time
                                </label>
                                <TimeRangePicker isSingle={true} id={'bufferTime'} startTime={signupCreds.bufferTime} onStartTimeChange={handleBufferTime} />
                            </div>
                        </div>
                        <div className="text-center mb-2">
                            <Button
                                label="Signup"
                                onClick={handleSignup}
                                loading={isLoading}
                                disabled={Object.values(signupCreds).some(value => !value)}
                            />
                        </div>
                        <div className="text-xs flex justify-end items-center gap-1">
                            <span>Already have an account?</span>
                            <Link href={"/login"}>
                                <span className="border-b border-b-transparent hover:text-blue-600 hover:cursor-pointer pb-0.5 hover:border-b-blue-600 font-medium">
                                    sign in
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {toaster.isVisible &&
                <Toaster message={toaster.message} type={toaster.type} />
            }
        </div>
    );
};
export default Signup;

