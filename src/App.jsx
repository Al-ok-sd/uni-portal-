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
} from "./Components";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authView, setAuthView] = useState(null); // null | "login" | "register"

  return (
    <div className="site">
      <Navbar
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
        onLogin={() => setAuthView("login")}
        onRegister={() => setAuthView("register")}
      />

      <Hero
        onRegister={() => setAuthView("register")}
        onLogin={() => setAuthView("login")}
      />

      <HowItWorks />
      <Features />
      <CtaBand onRegister={() => setAuthView("register")} />
      <Footer />

      <AuthModal
        authView={authView}
        onClose={() => setAuthView(null)}
        onSwitch={setAuthView}
      />
    </div>
  );
}