import { NextResponse } from "next/server";
// this function runs when someone sends post 
export async function POST(request: Request) {
    // convert from json to js object and wait for this befor moving
    const body = await request.json()
     
    // pull out the 3 values from the request body
    // its desctructuring
    const { studentName, date, time } = body

    // send back a json res with confirmation message
    // NextResponse.json converts object to json automatically
    return NextResponse.json({
       // template literal 
        message: ` Lesson booked for ${studentName} on ${date} at ${time}`,

        //tells the client the booking was successful
        success: true
    })

}