// this tells Next.js this is a client component
"use client"

// importing hooks only works in client component
import { useState } from "react";

export default function Quiz(){
    // track which answer the user selected
    const [selected, setSelected] = useState<string | null>(null)

    // hardcoded questions for now openAI will generate these later
    const question = "What does a yellow traffic light mean?"

    const answers = [
        "Speed up",
        "Slow down and prepare to stop",
        "Stop immediately",
        "Yield to pedestrians"
    ]

    return (
        <main>
            <h1>DMV Practice Quiz</h1>
            {/*display the question */}
            <p>{question}</p>
            {/* display each answer as a button */}
            {answers.map((answer) => (
                <button
                  key={answer}
                  onClick={() => setSelected(answer)}
                  style={{
                    display: "block",
                    margin: "8px 0",
                    padding:"8px 16px",
                    /// highlight selected answer
                    background: selected === answer ? "blue" : "gray",
                    color: "white",
                    cursor: "pointer"

                  }}
                  > {answer} </button>
            ))}
            {/* show selected answer only if somthing is selected*/}
            {selected && <p>You selected: {selected}</p>}
        </main>
    )
}