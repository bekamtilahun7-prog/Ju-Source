import WelcomeHeader from "../components/WelcomeHeader";
import ProfileMenu from "../components/ProfileMenu";
import CourseGrid from "../components/CourseGrid";
import { courses } from "../data/courses";
import "../styles/student-landing.css";
import { useAuth } from "../context/AuthContext";

export default function StudentLandingPage() {
  const { user } = useAuth();
  const userName = user?.name || "Student";

  return (
    <main className="student-landing-page">
      <div className="student-landing-shell">
        <div className="student-landing-topbar">
          <WelcomeHeader name={userName} />
          <ProfileMenu name={userName} />
        </div>

        {/* <section
          className="student-summary-panel"
          aria-label="Student overview"
        >
          <div className="student-summary-card">
            <span className="student-summary-label">Active courses</span>
            <span className="student-summary-value">06</span>
          </div>
          <div className="student-summary-card">
            <span className="student-summary-label">Assignments</span>
            <span className="student-summary-value">14</span>
          </div>
          <div className="student-summary-card">
            <span className="student-summary-label">Progress</span>
            <span className="student-summary-value">72%</span>
          </div>
        </section> */}

        <CourseGrid courses={courses} />
      </div>
    </main>
  );
}
