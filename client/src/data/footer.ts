import type { IFooter } from "../types";

export const footerData: IFooter[] = [
  {
    title: "Explore",
    links: [
      { name: "Home", href: "/" },
      { name: "Student Portal", href: "/student" },
      { name: "Department Head", href: "/head" },
      { name: "Course Library", href: "/student" },
    ],
  },
  {
    title: "Courses",
    links: [
      { name: "General Physics", href: "/courses/PHY%201001" },
      { name: "Mathematics", href: "/courses/MTH%20110" },
      { name: "English", href: "/courses/ENG%20101" },
      { name: "Geography", href: "/courses/GEO%20104" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact Us", href: "/#contact" },
      { name: "Help Center", href: "/#features" },
      { name: "Academic Policies", href: "/#contact" },
      { name: "Resources", href: "/student" },
    ],
  },
];
