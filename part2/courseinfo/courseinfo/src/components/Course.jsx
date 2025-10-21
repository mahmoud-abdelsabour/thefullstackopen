const Course = ({courses}) => {

  const course = courses.map(
    course => (
      <div key={course.id}>
        <Header  course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    ));

  return <div>{course}</div>
};

const Header = (props) => <h2>{props.course}</h2>

const Content = (props) => {
  const parts = props.parts.map(part => <Part key={part.id} part={part}/> )

  return(
  <div>
    {parts}
  </div>
)}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({parts}) => <p>total of {parts.reduce((sum,curr)=> sum +curr.exercises, 0)} exercises</p>

export default Course;