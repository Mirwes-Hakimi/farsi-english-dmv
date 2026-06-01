
// // async func, we can await data directly in the component
// export default async function Home(){

//     // fetch our own Api runs on server before page loads
//     const response = await fetch('http://localhost:3000/api/students')

//     //convert response to js arr
//     const students = await response.json()

//     return (
//         <main>
//           <h1>Next Gen Driving School</h1>
//           {/*loop through students and display each one  */}
//           {students.map((student: { id: number; name: string; lessonsCompleted: number}) =>(
//            <div key={student.id}>
//             <p>{student.name} - {student.lessonsCompleted} lessons</p>

//            </div>
//           ))}
//         </main>
//     )
// }




export default function Home(){
    
    return (
        <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center ">
          <div className=" bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                 🚗 DMV Practice Quiz
            </h1>
            <p className="text-gray-600 text-lg mb-8">
                 Prepare for your California DMV test with AI-generated practice questions
            </p>
            <a href="/quiz"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 trnasition-colors inline-block">
               Start Quiz → 
            </a>
            </div>  


        </main>
    )
}
