import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>
        {props.parts[0].name} {props.parts[0].exercizes}
      </p>
      <p>
        {props.parts[1].name} {props.parts[1].exercizes}
      </p>
      <p>
        {props.parts[2].name} {props.parts[2].exercizes}
      </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.parts[0].exercizes + props.parts[1].exercizes + props.parts[2].exercizes}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercizes: 10
      },
      {
        name: 'Using props to pass data',
        exercizes: 7
      },
      {
        name: 'State of a component',
        exercizes: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
