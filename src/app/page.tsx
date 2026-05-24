// export default function Home(){
//   return (
//     <main>
//       <h1>Next Gen Driving School</h1>
//       <p>Professonal driving lessons in the Bay Area</p>
//     </main>
//   )
// }





// async func, we can await data directly in the component
export default async function Home(){

    // fetch our own Api runs on server before page loads
    const response = await fetch('http://localhost:3000/api/students')

    //convert response to js arr
    const students = await response.json()

    return (
        <main>
          <h1>Next Gen Driving School</h1>
          {/*loop through students and display each one  */}
          {students.map((student: { id: number; name: string; lessonsCompleted: number}) =>(
           <div key={student.id}>
            <p>{student.name} - {student.lessonsCompleted} lessons</p>

           </div>
          ))}
        </main>
    )
}