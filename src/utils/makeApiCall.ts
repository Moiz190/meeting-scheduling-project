import axios, { AxiosRequestConfig, AxiosResponse, CanceledError } from "axios";
const baseUrl = 'http://localhost:3000/api/'

export const makeApiCall = async<T>(
    {
        endpoint,
        method,
        data,
        ...config
    }: {
        endpoint: string,
        method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
        data?: any,
    }
): Promise<T> => {
    const url = `${baseUrl}${endpoint}`
    try {
        console.log( method, url, data)
        const response: AxiosResponse<T> = await axios({ method, url, data, ...config })
        console.log(response)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new ApiError(
                error.response?.data.message || 'Unexpected Error Fetching Data',
                error.response?.status || 500
            );
        }
        if (error instanceof CanceledError) {
            throw error
        }
        throw error
    }
}
class ApiError extends Error {
    code: number;
    constructor(message: string, code: number) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}