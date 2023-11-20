const Header = (props) => {
    return (
      <div>
      <h2>{props.name}</h2>
    </div>
    )
  }
  const Part = (props) => {
    return (
      <div>
        {props.parts.map(content =>
        <p key={content.id}>
          {content.name} {content.exercises}
        </p>
        )}
      </div>
    )
  }
  const Content = (props) => {
    return (
      <div>
        <Part parts={props.parts}/>
      </div>
    )
  }  
  
  const Total = (props) => {
    return(
    <div>
    <b> total of {props.parts.map(x => x.exercises).reduce((a, b) => a + b)} exercises</b>
    </div>
  )}
  
  const Course = (props) => {
    return(
      <div>
        {props.courses.map( course =>
      <div key={course.id}>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
        )}
      </div>
    )
  }

  export default Course
  