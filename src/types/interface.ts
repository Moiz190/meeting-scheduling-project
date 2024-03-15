export interface ILoginCredential{
    name:string,
    password:string
}
export type IGenericReponse<T> ={
    type:string,
    data: T
}