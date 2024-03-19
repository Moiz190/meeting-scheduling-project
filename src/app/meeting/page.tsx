"use client";
import React, { useEffect, useState } from "react";
import MultiSelect from "@/components/common/MultiSelect";
import Button from "@/components/common/Button";
import { makeApiCall } from "@/utils/makeApiCall";
import { IGenericReponse, IUser, IUserAvailability, IUserAvailabilityResponse } from "@/types";
import { IMeetings } from "@/types/meeting";
import { useRouter } from "next/navigation";
import { getCookies } from "cookies-next";
const Meeting = () => {
  const router = useRouter();
  const loginToken = getCookies() as { token: string };
  const [userRecords, setUserRecords] = useState<IUser[]>([]);
  const [dateRecords, setDateRecords] = useState<IUserAvailabilityResponse[]>([]);
  const [scheduledMeetings, setScheduledMeetings] = useState<IMeetings[]>([]);
  const [newMeeting, setNewMeeting] = useState<IMeetings>({
    user: null,
    startTime: 0,
    endTime: "",
    day: 0,
  });
  const [isFetchingUserRecords, setIsFetchingUserRecords] = useState(false);
  const [isFetchingDateRecords, setIsFetchingDateRecords] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fetchUserRecords = async () => {
    try {
      setIsFetchingUserRecords(true);
      const response = await makeApiCall<IGenericReponse<IUser[]>>({
        endpoint: "user",
        method: "GET",
      });
      if (response.type === "Success") {
        const filteredRecords = response.data.filter(
          (record) => record.id !== Number(loginToken.token)
        );
        setUserRecords(filteredRecords);
      }
    } catch (e) {
      console.error(e);
    }
    setIsFetchingUserRecords(false);
  };
  const getUserAvailableDate = async (id: number) => {
    try {
      setIsFetchingDateRecords(true);
      const response = await makeApiCall<IGenericReponse<IUserAvailabilityResponse[]>>({
        endpoint: `user/${id}/availability`,
        method: "GET",
      });
      if (response.type === "Success") {
        setDateRecords(response.data);
      }
    } catch (e) {
      console.error(e);
    }
    setIsFetchingDateRecords(false);
  };
  useEffect(() => {
    fetchUserRecords();
  }, []);
  useEffect(() => {
    if (newMeeting.user) {
      getUserAvailableDate(newMeeting.user);
    }
  }, [newMeeting.user]);

  const handleSelectMeetingUser = (event: IUser[]) => {
    setNewMeeting((oldValue) => ({
      ...oldValue,
      user: event[0].id,
    }));
  };
  const handleSelectMeetingDate = (event: IUser[]) => {
    setNewMeeting((oldValue) => ({
      ...oldValue,
      day: event[0].dayAvailabilityStart,
    }));
  };
  const handleSelectMeetingTime = (event: IUser[]) => {
    setNewMeeting((oldValue) => ({
      ...oldValue,
      startTime: Number(event[0].timeAvailabilityStart),
    }));
  };
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const res = await makeApiCall<IGenericReponse<null>>({
        endpoint: "logout",
        method: "POST",
      });
      if (res.type === "Success") {
        router.push("/login");
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };
  const handleGoToAvailabilityPage = () => {
    router.push("/availability");
  };
  return (
    <div className="h-screen p-2 min-w-[300px] flex flex-col items-center justify-center bg-black gap-10">
      <div className="w-full flex justify-between">
        <Button
          className="text-sm !w-20"
          onClick={handleLogout}
          label="Logout"
          variant="secondary"
          loading={isLoading}
        />
        <Button
          className="text-sm !w-40"
          onClick={handleGoToAvailabilityPage}
          label="Add new Availability"
          variant="secondary"
          loading={isLoading}
        />
      </div>
      <div className="font-semibold text-center text-white text-3xl">
        <span>Schedule a Meeting</span>
      </div>
      <div className="flex gap-10 h-[400px] max-w-[900px] w-full justify-center">
        <div className="p-3 min-w-[305px] max-w-[400px] w-full bg-[#ced9dfab] rounded-lg">
          <div className="mb-2">
            <div className="text-lg mb-1">
              <span>Select a User for meeting</span>
            </div>
            <MultiSelect
              className={"w-full"}
              label="select user"
              isLoading={isFetchingUserRecords}
              singleSelect={true}
              onChange={handleSelectMeetingUser}
              options={userRecords}
            />
          </div>
          <div className="mb-2">
            <div className="text-lg mb-1">
              <span>Select Day for meeting</span>
            </div>
            <MultiSelect
              className={"w-full"}
              label="Available Days"
              isLoading={isFetchingDateRecords}
              singleSelect={true}
              onChange={handleSelectMeetingDate}
              options={dateRecords}
              optionLabel={"available_day_start"}
              isDay={true}
              optionLabel2={"available_day_end"}
            />
          </div>
          <div>
            <div className="text-lg mb-1">
              <span>Select Time for meeting</span>
            </div>
            <MultiSelect
              className={"w-full"}
              label="Available Timeslot"
              isLoading={isFetchingDateRecords}
              singleSelect={true}
              optionLabel="available_time_start"
              optionLabel2="available_time_end"
              onChange={handleSelectMeetingTime}
              options={dateRecords}
            />
          </div>
        </div>
        <div className="min-w-[305px] max-w-[400px] w-full bg-[#ced9dfab] rounded-lg p-3">
          <div className="text-lg text-center mb-1">
            <span>Scheduled Meetings</span>
          </div>
          {scheduledMeetings.length === 0 ? (
            <div className="text-center text-sm mt-12">
              <span>There are no Scheduled Meetings</span>
            </div>
          ) : (
            scheduledMeetings.map((meeting) => (
              <div
                key={meeting.user}
                className="flex flex-col gap-2 max-h-[340px] h-full overflow-auto px-1"
              >
                <div className="flex text-sm items-center justify-between bg-white text-black py-1 px-2 rounded-md">
                  <div className="p-1">
                    <span>{meeting.user}</span>
                  </div>
                  <div>
                    <span>
                      {meeting.startTime} - {meeting.endTime}
                    </span>
                  </div>
                  <Button label="Cancel" className="p-0.5 w-16 text-xs" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Button
        label="Schedule"
        variant="secondary"
        className="border-2 border-transparent"
      />
    </div>
  );
};
export default Meeting;
