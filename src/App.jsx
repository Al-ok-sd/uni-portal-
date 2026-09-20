import { useState } from "react";
import "./style.css";

import {
  Navbar,
  Hero,
  HowItWorks,
  Features,
  CtaBand,
  Footer,
  AuthModal,
} from "./Components/index";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  /*
    Auth states:

    null
    student-login
    student-register
    cr-login
    cr-register
  */

  const [authView, setAuthView] = useState(null);

  return (
    <div className="site">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
        onLogin={() => setAuthView("cr-login")}
        onRegister={() => setAuthView("cr-register")}
      />

      {/* =====================================================
          HERO
      ===================================================== */}

      <Hero
        /*
          Student clicks "Find my course"
          → Student Login opens
        */
        onFindCourse={() => setAuthView("student-login")}

        /*
          Hero CR Login button
          → CR Login opens
        */
        onLogin={() => setAuthView("cr-login")}
      />

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <HowItWorks />

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <Features />

      {/* =====================================================
          CR CTA
      ===================================================== */}

      <CtaBand
        onRegister={() => setAuthView("cr-register")}
        onLogin={() => setAuthView("cr-login")}
      />

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />

      {/* =====================================================
          AUTH MODAL
      ===================================================== */}

      <AuthModal
        authView={authView}
        onClose={() => setAuthView(null)}
        onSwitch={setAuthView}
      />

    </div>
  );
}