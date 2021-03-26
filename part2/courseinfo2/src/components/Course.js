import React from 'react'

const Course = ({ course }) => {
    return(
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

// subcomponents
const Header = ({ name }) => {
return (
<h2>{name}</h2>
)
}

const Total = ({ parts }) => {
  let listOfExcersises = []
  parts.forEach(part =>
    listOfExcersises.push(part.exercises)
  )

  const total = listOfExcersises.reduce((s, p) => {
    return s + p 
  })

  return(
    <p><b>Total exercises {total}</b></p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, i) =>
      <Part key={i} part={part} /> 
      )}
    </div>
  )
}

export default Course;