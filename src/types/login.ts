export interface ILoginCredential{
    name:string,
    email:string,
    password:string
}
export interface ISignupCredential{
    name:string,
    email:string,
    password:string,
    bufferTime:string,
    timeAvailabilityStart:string,
    dayAvailabilityStart:string,
    dayAvailabilityEnd:string,
    timeAvailabilityEnd:string,
}