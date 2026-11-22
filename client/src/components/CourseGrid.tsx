import type { Course } from "../data/courses";
import CourseCard from "./CourseCard";

type CourseGridProps = {
  courses: Course[];
};

export default function CourseGrid({ courses }: CourseGridProps) {
  return (
    <section className="student-course-grid" aria-label="Course list">
      {courses.map((course) => (
        <CourseCard key={course.code} course={course} />
      ))}
    </section>
  );
}
