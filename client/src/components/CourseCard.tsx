import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Course } from "../data/courses";

type CourseCardProps = {
  course: Course;
};

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="student-course-card">
      <div
        className={`student-course-icon student-course-icon--${course.accent}`}
      >
        {course.title.slice(0, 1).toUpperCase()}
      </div>

      <div className="student-course-topbar">
        <span className="student-course-badge">{course.badge}</span>
        <span className="student-course-code">{course.code}</span>
      </div>

      <h3>{course.title}</h3>
      <p className="student-course-instructor">{course.instructor}</p>

      <div className="student-course-footer">
        <span>{course.lessons} resources</span>
        <Link
          to={`/courses/${course.code}`}
          className="inline-flex items-center gap-1 rounded-full bg-[var(--navy-blue)]/8 px-3 py-2 text-[var(--navy-blue)]"
        >
          Open course
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
