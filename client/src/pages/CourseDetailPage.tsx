import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  FolderOpen,
  Download,
  NotebookPen,
  BadgeCheck,
} from "lucide-react";
import { courses } from "../data/courses";

const courseResources: Record<
  string,
  Array<{
    id: string;
    title: string;
    type: string;
    size: string;
    description: string;
    file?: string;
  }>
> = {
  "PHY 1001": [
    {
      id: "phy-1",
      title: "Mechanics Lecture Notes",
      type: "Lecture Notes",
      size: "2.4 MB",
      description:
        "Core concepts, formulas, and examples for motion, force, and energy.",
      file: "physics-notes.pdf",
    },
    {
      id: "phy-2",
      title: "Practice Problem Set",
      type: "Assignment",
      size: "1.1 MB",
      description: "Weekly set of problem-solving questions with answer hints.",
      file: "physics-assignment.pdf",
    },
  ],
  "MTH 110": [
    {
      id: "mth-1",
      title: "Calculus Fundamentals",
      type: "Lecture Notes",
      size: "3.2 MB",
      description:
        "Functions, derivatives, and integration techniques for beginners.",
      file: "math-notes.pdf",
    },
  ],
  "ENG 101": [
    {
      id: "eng-1",
      title: "Academic Writing Guide",
      type: "Lecture Notes",
      size: "1.8 MB",
      description:
        "Paragraph structure, research writing, and citations basics.",
      file: "eng-writing.pdf",
    },
  ],
  "GEO 104": [
    {
      id: "geo-1",
      title: "World Geography Overview",
      type: "Past Exam",
      size: "1.5 MB",
      description:
        "Past exam questions and key regional summaries for revision.",
      file: "geo-exam.pdf",
    },
  ],
  "PSY 102": [
    {
      id: "psy-1",
      title: "Introduction to Human Behavior",
      type: "Lecture Notes",
      size: "2.7 MB",
      description: "Foundations of psychology and key behavior concepts.",
      file: "psychology.pdf",
    },
  ],
  "PE 120": [
    {
      id: "pe-1",
      title: "Wellness & Fitness Module",
      type: "Lecture Notes",
      size: "1.2 MB",
      description: "Movement, physical health, and exercise planning basics.",
      file: "fitness.pdf",
    },
  ],
};

export default function CourseDetailPage() {
  const { courseCode } = useParams();

  const course = useMemo(
    () => courses.find((item) => item.code === courseCode),
    [courseCode],
  );

  const resources = course ? (courseResources[course.code] ?? []) : [];

  if (!course) {
    return (
      <main className="min-h-screen bg-[var(--page-bg)] px-4 pb-16 pt-32 text-center">
        <div className="mx-auto max-w-xl rounded-[28px] border border-[var(--border)] bg-[var(--card-bg)] p-10 shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-[var(--navy-blue)]">
            Course not found
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-[var(--heading)]">
            This course is not available yet.
          </h1>
          <p className="mt-3 text-[var(--muted-text)]">
            Please return to the student portal and choose another course.
          </p>
          <Link
            to="/student"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--navy-blue)] px-6 py-3 text-sm font-medium text-white shadow-[0_12px_28px_rgba(59,130,246,0.25)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to courses
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--page-bg)] px-4 pb-16 pt-28 md:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center gap-3 text-sm text-[var(--muted-text)]">
          <Link
            to="/student"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-[var(--body-text)] transition hover:border-[var(--navy-blue)]/50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>

        <section className="overflow-hidden rounded-[30px] border border-[var(--border)] bg-[var(--card-bg)] shadow-[0_18px_50px_rgba(59,130,246,0.08)]">
          <div className="bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_52%)] p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 inline-flex rounded-full border border-[var(--border)] bg-[var(--page-bg)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--navy-blue)]">
                  {course.badge}
                </p>
                <h1 className="text-3xl font-semibold tracking-tight text-[var(--heading)] md:text-4xl">
                  {course.title}
                </h1>
                <p className="mt-2 text-[var(--muted-text)]">
                  {course.code} • {course.lessons} learning resources
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--page-bg)] px-4 py-3 text-sm text-[var(--body-text)]">
                <p className="font-medium text-[var(--heading)]">
                  Course status
                </p>
                <p className="mt-1 inline-flex items-center gap-2 text-[var(--navy-blue)]">
                  <BadgeCheck className="h-4 w-4" />
                  Active this semester
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5">
              <div className="rounded-[24px] border border-[var(--border)] bg-[var(--page-bg)] p-4 md:p-5">
                <div className="mb-4 flex items-center gap-2 text-[var(--heading)]">
                  <FolderOpen className="h-4 w-4 text-[var(--navy-blue)]" />
                  <span className="font-medium">Study materials</span>
                </div>

                {resources.length === 0 ? (
                  <div className="rounded-[20px] border border-dashed border-[var(--border)] bg-[var(--card-bg)] p-8 text-center">
                    <NotebookPen className="mx-auto h-8 w-8 text-[var(--muted-text)]" />
                    <h2 className="mt-4 text-xl font-semibold text-[var(--heading)]">
                      No courses yet
                    </h2>
                    <p className="mt-2 text-sm text-[var(--muted-text)]">
                      This course currently has no uploaded materials. Check
                      back soon or ask your instructor for the latest resources.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {resources.map((resource) => (
                      <div
                        key={resource.id}
                        className="flex flex-col gap-3 rounded-[18px] border border-[var(--border)] bg-[var(--card-bg)] p-4 md:flex-row md:items-center md:justify-between"
                      >
                        <div className="flex items-start gap-3">
                          <div className="rounded-xl bg-[var(--navy-blue)]/10 p-2.5 text-[var(--navy-blue)]">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="text-base font-medium text-[var(--heading)]">
                              {resource.title}
                            </h3>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[var(--muted-text)]">
                              <span className="rounded-full bg-[var(--page-bg)] px-2 py-1">
                                {resource.type}
                              </span>
                              <span>{resource.size}</span>
                            </div>
                            <p className="mt-2 text-sm text-[var(--muted-text)]">
                              {resource.description}
                            </p>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--border)] bg-[var(--page-bg)] px-4 py-2 text-sm font-medium text-[var(--body-text)] transition hover:border-[var(--navy-blue)]/50 hover:text-[var(--navy-blue)] md:self-center"
                        >
                          <Download className="h-4 w-4" />
                          Open file
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-[24px] border border-[var(--border)] bg-[var(--page-bg)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--navy-blue)]">
                  Quick info
                </p>
                <ul className="mt-4 space-y-3 text-sm text-[var(--muted-text)]">
                  <li className="flex items-center justify-between gap-3 border-b border-[var(--border)] pb-2">
                    <span>Department</span>
                    <span className="font-medium text-[var(--body-text)]">
                      Science
                    </span>
                  </li>
                  <li className="flex items-center justify-between gap-3 border-b border-[var(--border)] pb-2">
                    <span>Semester</span>
                    <span className="font-medium text-[var(--body-text)]">
                      Fall 2026
                    </span>
                  </li>
                  <li className="flex items-center justify-between gap-3">
                    <span>Resources</span>
                    <span className="font-medium text-[var(--body-text)]">
                      {resources.length}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-[24px] border border-[var(--border)] bg-[var(--card-bg)] p-5">
                <p className="text-sm font-medium text-[var(--heading)]">
                  Need guidance?
                </p>
                <p className="mt-2 text-sm text-[var(--muted-text)]">
                  Review the latest lecture notes and assignments for this
                  course before your next class.
                </p>
                <Link
                  to="/student"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--navy-blue)] px-4 py-2.5 text-sm font-medium text-white shadow-[0_12px_28px_rgba(59,130,246,0.25)]"
                >
                  Explore more courses
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
