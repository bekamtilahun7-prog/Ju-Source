import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import LenisScroll from "./components/LenisScroll";
import Login from "./components/Login";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import DepartmentHeadPage from "./pages/Department-head";
import StudentLandingPage from "./pages/StudentLandingPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  const { pathname, hash } = useLocation();
  const isHomePage = pathname === "/";

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <>
      <Toaster />
      <Navbar />
      <LenisScroll />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={<StudentLandingPage />} />
        <Route path="/head" element={<DepartmentHeadPage />} />
        <Route path="/courses/:courseCode" element={<CourseDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {isHomePage && <Footer />}
    </>
  );
}
