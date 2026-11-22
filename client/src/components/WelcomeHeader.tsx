type WelcomeHeaderProps = {
  name: string;
};

export default function WelcomeHeader({ name }: WelcomeHeaderProps) {
  return (
    <div className="student-landing-header">
      <p className="student-landing-eyebrow">Student dashboard</p>
      <h1>Welcome back, {name}</h1>
      <p className="student-landing-subtitle">
        Continue your learning journey and keep up with your upcoming courses.
      </p>
    </div>
  );
}
