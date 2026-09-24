import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CRDashboard from "./Components/Cr";
import "./style.css";

import {
  Navbar,
  Hero,
  HowItWorks,
  Features,
  CtaBand,
  Footer,
  AuthModal,
} from "./Components/hero/index";
import CourseFinderPage from "./pages/CourseFinderPage";

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authView, setAuthView] = useState(null);
  const navigate = useNavigate();

  /*
    Auth states:

    null
    student-login
    student-register
    cr-login
    cr-register
  */

  return (
    <div className="site">
      <Navbar
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
        onLogin={() => setAuthView("cr-login")}
        onRegister={() => setAuthView("cr-register")}
      />

      <Hero
        onFindCourse={() => navigate("/courses")}
        onLogin={() => setAuthView("cr-login")}
      />

      <HowItWorks />
      <Features />

      <CtaBand
        onRegister={() => setAuthView("cr-register")}
        onLogin={() => setAuthView("cr-login")}
      />

      <Footer />

      <AuthModal
        authView={authView}
        onClose={() => setAuthView(null)}
        onSwitch={setAuthView}
      />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/courses" element={<CourseFinderPage />} />
  <Route path="/cr/dashboard" element={<CRDashboard />} />   {/* ← add this line */}
</Routes>
  );
}