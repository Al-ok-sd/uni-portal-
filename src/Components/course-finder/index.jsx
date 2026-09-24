import React, { useState } from "react";
import "./style.css";

/* =========================================================
   COURSE FINDER PAGE

   FLOW:

   Student
      ↓
   Search courses
      ↓
   Select courses
      ↓
   Save All
      ↓
   Student Login Modal
      ↓
   Login
      ↓
   Future: Save selected courses to backend

========================================================= */

export default function CourseFinder({
  courses = [],
  initialSelectedIds = [],
  onSaved,
}) {
  const [query, setQuery] = useState("");

  const [selected, setSelected] = useState(
    () => new Set(initialSelectedIds)
  );

  const [showLoginModal, setShowLoginModal] = useState(false);

  const [showRegisterModal, setShowRegisterModal] =
    useState(false);

  const [loginEmail, setLoginEmail] = useState("");

  const [loginPassword, setLoginPassword] =
    useState("");

  const [loginError, setLoginError] = useState("");

  const [loginLoading, setLoginLoading] =
    useState(false);

  const [savedMessage, setSavedMessage] =
    useState("");

  /* =========================================================
     FILTER COURSES
  ========================================================= */

  const filtered = courses.filter((course) => {
    const q = query.trim().toLowerCase();

    if (!q) return true;

    return (
      course.code?.toLowerCase().includes(q) ||
      course.name?.toLowerCase().includes(q) ||
      course.section?.toLowerCase().includes(q) ||
      course.crName?.toLowerCase().includes(q)
    );
  });

  /* =========================================================
     SELECT / UNSELECT
  ========================================================= */

  function toggle(courseId) {
    setSelected((current) => {
      const next = new Set(current);

      if (next.has(courseId)) {
        next.delete(courseId);
      } else {
        next.add(courseId);
      }

      return next;
    });

    setSavedMessage("");
  }

  /* =========================================================
     REMOVE
  ========================================================= */

  function remove(courseId) {
    setSelected((current) => {
      const next = new Set(current);

      next.delete(courseId);

      return next;
    });

    setSavedMessage("");
  }

  /* =========================================================
     SAVE ALL

     IMPORTANT:

     Student does NOT need to login while browsing.

     Login is required only when they actually
     want to save their selected courses.
  ========================================================= */

  function handleSaveAll() {
    if (selectedCourses.length === 0) {
      return;
    }

    setLoginError("");

    setShowLoginModal(true);
  }

  /* =========================================================
     STUDENT LOGIN

     For now this is frontend/demo login.

     Later replace this section with your backend API.
  ========================================================= */

  async function handleStudentLogin(e) {
    e.preventDefault();

    setLoginError("");

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError(
        "Please enter your email and password."
      );

      return;
    }

    setLoginLoading(true);

    try {
      /*
       ------------------------------------------------------
       FUTURE BACKEND LOGIN

       Example:

       const response = await fetch(
         "/api/student/login",
         {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({
             email: loginEmail,
             password: loginPassword,
           }),
         }
       );

       const data = await response.json();

       if (!response.ok) {
         throw new Error(data.message);
       }

       ------------------------------------------------------
      */

      // Demo delay
      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      /*
       ------------------------------------------------------
       TEMPORARY LOGIN

       This is only so the UI works now.

       Backend authentication can be connected later.
       ------------------------------------------------------
      */

      const selectedCourses =
        courses.filter((course) =>
          selected.has(course.id)
        );

      try {
        localStorage.setItem(
          "classboard_selected_courses",
          JSON.stringify(selectedCourses)
        );

        localStorage.setItem(
          "classboard_student_logged_in",
          "true"
        );

        localStorage.setItem(
          "classboard_student_email",
          loginEmail.trim()
        );
      } catch (storageError) {
        console.error(
          "Could not save login information:",
          storageError
        );
      }

      setShowLoginModal(false);

      setSavedMessage(
        `${selectedCourses.length} course${
          selectedCourses.length === 1
            ? ""
            : "s"
        } saved successfully.`
      );

      if (onSaved) {
        onSaved(selectedCourses);
      }

    } catch (error) {
      setLoginError(
        error.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoginLoading(false);
    }
  }

  /* =========================================================
     CLOSE LOGIN MODAL
  ========================================================= */

  function closeLoginModal() {
    if (loginLoading) {
      return;
    }

    setShowLoginModal(false);

    setLoginError("");
  }

  /* =========================================================
     REGISTER MODAL
  ========================================================= */

  function openRegisterModal() {
    setShowLoginModal(false);

    setLoginError("");

    setShowRegisterModal(true);
  }

  function closeRegisterModal() {
    setShowRegisterModal(false);
  }

  /* =========================================================
     SELECTED COURSES
  ========================================================= */

  const selectedCourses = courses.filter((course) =>
    selected.has(course.id)
  );

  return (
    <div className="coursefinder-page">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="cf-navbar">

        <a
          className="cf-brand"
          href="/"
        >
          <span className="cf-brand-mark">
            CS
          </span>

          <span>
            Class<span>Schedule</span>
          </span>
        </a>


        <nav className="cf-nav-links">

          <a href="/#how">
            How it works
          </a>

          <a href="/#features">
            Features
          </a>

          <a
            href="#course-finder"
            className="active"
          >
            Find a course
          </a>

        </nav>


        <div className="cf-nav-actions">

          <button
            type="button"
            className="cf-btn cf-btn-ghost"
            onClick={() =>
              setShowLoginModal(true)
            }
          >
            Student Login
          </button>

          <button
            type="button"
            className="cf-btn cf-btn-solid"
            onClick={() =>
              setShowRegisterModal(true)
            }
          >
            Student Create Account
          </button>

        </div>

      </header>


      {/* =====================================================
          HERO
      ===================================================== */}

      <main>

        <section className="cf-hero">

          <div className="cf-hero-content">

            <div className="cf-eyebrow">

              <span className="cf-eyebrow-dot"></span>

              STUDENT ACCESS

            </div>


            <h1>
              Find your
              <span> courses.</span>
            </h1>


            <p>
              Search for your university courses,
              select the ones you need, and save
              them to your ClassSchedule account.
            </p>

          </div>

        </section>


        {/* =================================================
            COURSE FINDER
        ================================================= */}

        <section
          className="cf-section"
          id="course-finder"
        >

          <div className="cf-container">

            {/* SEARCH CARD */}

            <div className="cf-search-card">

              <div className="cf-card-header">

                <div className="cf-card-icon">
                  🔎
                </div>

                <div>

                  <h2>
                    Find your courses
                  </h2>

                  <p>
                    Search by course code, name,
                    section or CR.
                  </p>

                </div>

              </div>


              {/* SEARCH */}

              <div className="cf-search-wrapper">

                <label htmlFor="course-search">
                  Search Courses
                </label>

                <div className="cf-search-input-wrapper">

                  <span className="cf-search-icon">
                    🔎
                  </span>

                  <input
                    id="course-search"
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSavedMessage("");
                    }}
                    placeholder="e.g. CSE 3105, Database Systems, Section A..."
                  />

                </div>

              </div>


              {/* COURSE LIST */}

              <div className="cf-course-list">

                {filtered.length === 0 ? (

                  <div className="cf-empty">

                    <div className="cf-empty-icon">
                      🔍
                    </div>

                    <h3>
                      No courses found
                    </h3>

                    <p>
                      Try another course name,
                      code, section or CR name.
                    </p>

                  </div>

                ) : (

                  filtered.map((course) => {

                    const isSelected =
                      selected.has(course.id);

                    return (

                      <div
                        key={course.id}
                        className={
                          "cf-course-card" +
                          (isSelected
                            ? " is-selected"
                            : "")
                        }
                      >

                        <div className="cf-course-info">

                          <div className="cf-course-code">
                            {course.code}
                          </div>

                          <h3>
                            {course.name}
                          </h3>

                          <div className="cf-course-meta">

                            {course.section && (
                              <span>
                                Section{" "}
                                {course.section}
                              </span>
                            )}

                            {course.section &&
                              course.crName && (
                                <span className="cf-dot">
                                  ·
                                </span>
                              )}

                            {course.crName && (
                              <span>
                                CR{" "}
                                {course.crName}
                              </span>
                            )}

                          </div>

                        </div>


                        <button
                          type="button"
                          className={
                            "cf-select-btn " +
                            (isSelected
                              ? "selected"
                              : "")
                          }
                          aria-pressed={isSelected}
                          onClick={() =>
                            toggle(course.id)
                          }
                        >

                          {isSelected ? (
                            <>
                              <span>✓</span>
                              Selected
                            </>
                          ) : (
                            <>
                              <span>+</span>
                              Select
                            </>
                          )}

                        </button>

                      </div>

                    );

                  })

                )}

              </div>

            </div>


            {/* =================================================
                SELECTED COURSES
            ================================================= */}

            <div className="cf-selection-card">

              <div className="cf-selection-header">

                <div>

                  <span className="cf-selection-label">
                    YOUR SELECTION
                  </span>

                  <h2>
                    Selected courses
                  </h2>

                </div>


                <div className="cf-selection-count">
                  {selectedCourses.length}
                </div>

              </div>


              <div className="cf-selected-list">

                {selectedCourses.length === 0 ? (

                  <div className="cf-selection-empty">

                    <div className="cf-selection-empty-icon">
                      +
                    </div>

                    <div>

                      <h3>
                        No courses selected
                      </h3>

                      <p>
                        Select a course above and
                        it will appear here.
                      </p>

                    </div>

                  </div>

                ) : (

                  selectedCourses.map((course) => (

                    <div
                      className="cf-selected-course"
                      key={course.id}
                    >

                      <div>

                        <strong>
                          {course.code}
                        </strong>

                        <span>
                          {course.name}
                        </span>

                      </div>


                      <button
                        type="button"
                        className="cf-remove-btn"
                        onClick={() =>
                          remove(course.id)
                        }
                        aria-label={
                          `Remove ${course.code}`
                        }
                      >
                        ×
                      </button>

                    </div>

                  ))

                )}

              </div>


              {/* =================================================
                  SAVE
              ================================================= */}

              <div className="cf-save-area">

                {savedMessage && (

                  <div className="cf-success-message">

                    <span>✓</span>

                    {savedMessage}

                  </div>

                )}


                <button
                  type="button"
                  className="cf-save-all-btn"
                  disabled={
                    selectedCourses.length === 0
                  }
                  onClick={handleSaveAll}
                >

                  <span>
                    Save All
                  </span>

                  <span className="cf-save-arrow">
                    →
                  </span>

                </button>

              </div>


              <p className="cf-login-note">

                <span>🔒</span>

                Login is required to save
                your courses to your account.

              </p>

            </div>

          </div>

        </section>


        {/* =====================================================
            INFO SECTION
        ===================================================== */}

        <section className="cf-info-section">

          <div className="cf-container">

            <div className="cf-info-grid">

              <div className="cf-info-item">

                <div className="cf-info-number">
                  01
                </div>

                <h3>
                  Find your course
                </h3>

                <p>
                  Search using your course
                  code, name, section or CR.
                </p>

              </div>


              <div className="cf-info-item">

                <div className="cf-info-number">
                  02
                </div>

                <h3>
                  Select your courses
                </h3>

                <p>
                  Choose the courses you
                  want to keep organised.
                </p>

              </div>


              <div className="cf-info-item">

                <div className="cf-info-number">
                  03
                </div>

                <h3>
                  Login & save
                </h3>

                <p>
                  Login to your student account
                  when you are ready to save.
                </p>

              </div>

            </div>

          </div>

        </section>

      </main>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="cf-footer">

        <div className="cf-footer-inner">

          <div className="cf-footer-brand">

            <span className="cf-brand-mark">
              CS
            </span>

            <span>
              Class<span>Schedule</span>
            </span>

          </div>

          <p>
            Academic information, organised by course.
          </p>

        </div>

      </footer>


      {/* =====================================================
          STUDENT LOGIN MODAL
      ===================================================== */}

      {showLoginModal && (

        <div
          className="cf-modal-overlay"
          onMouseDown={closeLoginModal}
        >

          <div
            className="cf-auth-modal"
            onMouseDown={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="cf-modal-close"
              onClick={closeLoginModal}
              aria-label="Close login"
            >
              ×
            </button>


            <div className="cf-auth-icon">
              👨‍🎓
            </div>


            <div className="cf-auth-header">

              <span className="cf-auth-label">
                STUDENT ACCOUNT
              </span>

              <h2>
                Login to save your courses
              </h2>

              <p>
                Your selected courses will be
                saved to your student account.
              </p>

            </div>


            <form
              className="cf-auth-form"
              onSubmit={handleStudentLogin}
            >

              <div className="cf-form-field">

                <label htmlFor="student-email">
                  Email
                </label>

                <input
                  id="student-email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) =>
                    setLoginEmail(e.target.value)
                  }
                  placeholder="1122@student.pu.edu.bd"
                  autoComplete="email"
                />

              </div>


              <div className="cf-form-field">

                <label htmlFor="student-password">
                  Password
                </label>

                <input
                  id="student-password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) =>
                    setLoginPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />

              </div>


              {loginError && (

                <div className="cf-auth-error">
                  {loginError}
                </div>

              )}


              <button
                type="submit"
                className="cf-login-submit"
                disabled={loginLoading}
              >

                {loginLoading
                  ? "Logging in..."
                  : "Login & Save Courses"}

                {!loginLoading && (
                  <span>→</span>
                )}

              </button>

            </form>


            <div className="cf-auth-footer">

              <span>
                Don't have a student account?
              </span>

              <button
                type="button"
                onClick={openRegisterModal}
              >
                Create Account
              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          STUDENT REGISTER MODAL
      ===================================================== */}

      {showRegisterModal && (

        <div
          className="cf-modal-overlay"
          onMouseDown={closeRegisterModal}
        >

          <div
            className="cf-auth-modal"
            onMouseDown={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="cf-modal-close"
              onClick={closeRegisterModal}
              aria-label="Close register"
            >
              ×
            </button>


            <div className="cf-auth-icon">
              ✨
            </div>


            <div className="cf-auth-header">

              <span className="cf-auth-label">
                STUDENT ACCOUNT
              </span>

              <h2>
                Create your account
              </h2>

              <p>
                Create an account to save and
                manage your courses.
              </p>

            </div>


            <form
              className="cf-auth-form"
              onSubmit={(e) => {
                e.preventDefault();

                alert(
                  "Student registration will be connected to the backend soon."
                );
              }}
            >

              <div className="cf-form-field">

                <label htmlFor="register-name">
                  Full Name
                </label>

                <input
                  id="register-name"
                  type="text"
                  placeholder="Your full name"
                  required
                />

              </div>


              <div className="cf-form-field">

                <label htmlFor="register-email">
                  Email
                </label>

                <input
                  id="register-email"
                  type="email"
                  placeholder="student@example.com"
                  required
                />

              </div>


              <div className="cf-form-field">

                <label htmlFor="register-password">
                  Password
                </label>

                <input
                  id="register-password"
                  type="password"
                  placeholder="Create a password"
                  required
                />

              </div>


              <button
                type="submit"
                className="cf-login-submit"
              >

                Create Student Account

                <span>
                  →
                </span>

              </button>

            </form>


            <div className="cf-auth-footer">

              <span>
                Already have an account?
              </span>

              <button
                type="button"
                onClick={() => {
                  setShowRegisterModal(false);
                  setShowLoginModal(true);
                }}
              >
                Login
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}