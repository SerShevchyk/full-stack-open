import SubHeader from './SubHeader'
import Content from './Content'
import Total from './Total'

const Course = ({course}) => {
  return (
    <>
      <SubHeader text = {course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </>
  );
};

export default Course;