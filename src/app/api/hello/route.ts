
import { stat } from "fs";
import { NextResponse } from "next/server";

export async function GET(){
     return NextResponse.json({
        message: "Hello from Next Gen Driving School API",
        status: "running"
     })
}