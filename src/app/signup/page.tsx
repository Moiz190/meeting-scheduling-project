"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IGenericReponse, ISignupCredential, IToaster } from "@/types";
import TimeRangePicker from '@/components/common/TimeRangePicker';
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { makeApiCall } from "@/utils/makeApiCall";
import { Toaster } from "@/components/common/Toaster";
import { useRouter } from "next/navigation";
import MultiSelect from '@/components/common/MultiSelect';
import { days } from "./utils";
import { convertTimeToMinutes } from "@/utils/convertTimeToMinutes";
const Signup = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')
    const [validation, setValidation] = useState({
        email: '',
        name:'',
        password: '',
    });
    const [toaster, setToaster] = useState<IToaster>({
        message: '',
        isVisible: false,
        type: 'positive',
    })
    const [signupCreds, setSignupCreds] = useState<ISignupCredential>({
        name: "",
        password: "",
        email: "",
        bufferTime: 0,
        dayAvailabilityStart: "",
        dayAvailabilityEnd: "",
        timeAvailabilityStart: "00:00",
        timeAvailabilityEnd: "00:00",
    });
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
    const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignupCreds((oldValue) => ({
            ...oldValue,
            timeAvailabilityStart: event.target.value,
        }));
    };
    const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignupCreds((oldValue) => ({
            ...oldValue,
            timeAvailabilityEnd: event.target.value,
        }));
    };
    const handleBufferTime = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value)
        if (newValue > 0) {
            setSignupCreds((oldValue) => ({
                ...oldValue,
                bufferTime: newValue,
            }));
        } else if (!newValue || newValue <= 0) {
            setSignupCreds((oldValue) => ({
                ...oldValue,
                bufferTime: 0,
            }));
        }
    }
    const handleSignup = async () => {
        try {
            const startTime = convertTimeToMinutes(signupCreds.timeAvailabilityStart)
            const endTime = convertTimeToMinutes(signupCreds.timeAvailabilityEnd)
            setError('')
            if (startTime > endTime) {
                setError('End Time cannot be greater than Start Time')
                return
            }
            setIsLoading(true)
            const signupPayload = {
                ...signupCreds,
                timeAvailabilityStart: startTime,
                timeAvailabilityEnd: endTime
            }
            const response = await makeApiCall<IGenericReponse<null>>({
                endpoint: 'signup',
                method: 'POST',
                data: signupPayload
            })
            if (response.type === 'Success') {
                router.push('/availability')
            }
        } catch (e) {
            setError(e as string)
        }
        setIsLoading(false)
    };
    return (
        <div className="h-screen p-2 md:p-4 grid grid-col-1 md:grid-cols-2">
            <div className="hidden md:block"></div>
            <div className="flex justify-center items-center">
                <div className="flex flex-col bg-[#5c7481ab] dark:bg-[#f4f5f6ab] shadow-lg p-5 rounded-lg
        min-w-[305px] w-full max-w-[350px]">
                    <div>
                        <div className="text-center dark:text-white text-black font-medium text-2xl py-2 mb-4">
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
                                    Select Your Buffer Time(mins)
                                </label>
                                <InputField id={'bufferTime'} type="number" value={signupCreds.bufferTime} onChange={handleBufferTime} />
                            </div>
                        </div>
                        <div className="text-center mb-2">
                            <Button
                                label="Signup"
                                onClick={handleSignup}
                                loading={isLoading}
                                disabled={!Object.values(signupCreds).some(value => !value)}
                            />
                        </div>
                        {
                            error &&
                            <div className="bg-white bg-opacity-50 text-xs text-black text-center mb-1 p-1">
                                {error}
                            </div>
                        }
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

