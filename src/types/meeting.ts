export interface IMeetingPayload {
    source_user:number | null,
    target_user:number | null,
    startTime:number,
    endTime:number,
    day:number,
}
export interface IMeetingRecords {
    id:number,
    meeting_start:number,
    meeting_end:number,
    createdAt:string,
    updatedAt:string,
}