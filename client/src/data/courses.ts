export type Course = {
  title: string;
  code: string;
  lessons: number;
  accent: string;
  badge: string;
};

export const courses: Course[] = [
  {
    title: "General Physics",
    code: "PHY 1001",
    lessons: 12,
    accent: "physics",
    badge: "Course code",
  },
  {
    title: "Mathematics",
    code: "MTH 110",
    lessons: 10,
    accent: "math",
    badge: "Foundation",
  },
  {
    title: "Communicative English I",
    code: "ENG 101",
    lessons: 8,
    accent: "english",
    badge: "Writing",
  },
  {
    title: "Geography",
    code: "GEO 104",
    lessons: 9,
    accent: "geography",
    badge: "Field work",
  },
  {
    title: "General Psychology",
    code: "PSY 102",
    lessons: 14,
    accent: "psychology",
    badge: "Behavior",
  },
  {
    title: "Physical Fitness",
    code: "PE 120",
    lessons: 7,
    accent: "fitness",
    badge: "Wellness",
  },
];
