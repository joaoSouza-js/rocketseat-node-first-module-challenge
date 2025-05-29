import { type IncomingMessage } from "node:http";

declare module "node:http"{
    interface IncomingMessage {
        body: any,
        params: {
            [key: string]: string
        },
        query: {
            [key:string]: string
        }
    }
}