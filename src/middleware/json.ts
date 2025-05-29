import { IncomingMessage, ServerResponse } from "node:http";



export async function jsonMiddleware(request:IncomingMessage) {
    const dataChunk: Buffer[] = []
    if(request.headers["content-type"] !== "application/json") return {}
    for await (const chunk of request){
        dataChunk.push(chunk)
    }
    const dataString = Buffer.concat(dataChunk).toString()
    const data = JSON.parse(dataString)

    request.body = data


}