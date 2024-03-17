export interface IUser {
    timeAvailabilityEnd: string | number,
    timeAvailabilityStart: string | number,
    dayAvailabilityEnd: number,
    dayAvailabilityStart: number,
    createdAt: string,
    email: string,
    id: number,
    name: string,
    password: string,
    updatedAt: string,
}
export interface IUserAvailability{
    user_id:number,
    available_day_start:number,
    available_day_end:number,
    available_time_start:number,
    available_time_end:number,
    buffer_time:number,
    createdAt:string,
    updatedAt:string
}