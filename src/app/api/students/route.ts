import { NextResponse } from "next/server";

export async function GET(){
    const students = [
        { id: 1, name: "Ahmad", lessonsCompleted: 5, status: "active"},
        { id: 2, name: "Ann", lessonsCompleted: 8, status: "active"},
        { id: 3, name: "Ali", lessonsCompleted: 8, status: "inactive" },

    ]
    return NextResponse.json(students)
}
