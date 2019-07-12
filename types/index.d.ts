import {Request, RequestCallback} from "request";

export interface App{
sendRequest(uri: string, callback?: RequestCallback): Request;

}