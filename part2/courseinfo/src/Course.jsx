const Header = ({ course }) => {
  return <h2>{course}</h2>
}

const Part = ({ part, exercises }) => {
  return <p>{part} {exercises}</p>
}

const Content = ({ parts }) => {
 return parts.map(part => (
  <Part key={part.id} part={part.name} exercises={part.exercises}/>
 ))
}

const Total = ({ parts }) => {
  const sumOfExercises = parts.reduce((acc, cur) => acc + cur.exercises, 0)

  return <strong>Total of {sumOfExercises} exercises</strong>
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course