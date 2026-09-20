/**
 * CourseSelector
 * ------------------------------------------------------------------
 * Same behavior as before — search, live multi-select, sticky
 * selection tray, auth-gated save — restyled to match the existing
 * ClassBoard design system (global.css: --primary, --navy, --text,
 * --border, --radius-*, --shadow-*, .btn/.btn-solid/.btn-ghost,
 * .form-field, .board-course/.board-name, .section-badge).
 *
 * It deliberately reuses your existing classes instead of inventing
 * new ones wherever the look already matches:
 *   - search field      -> .form-field (same markup as the finder form)
 *   - select buttons     -> .btn + .btn-solid / .btn-ghost
 *   - course code/name   -> .board-course / .board-name
 *   - selection chips     -> built on the same visual language as
 *                            .section-badge (pill, primary-light bg)
 *
 * Only the pieces with no existing equivalent get new, narrowly
 * scoped classes: .course-selector, .course-select-list,
 * .course-select-card, .course-row-meta, .selection-tray and its
 * children. See CourseSelector.css.
 *
 * PROPS
 * - courses: Array<{ id, code, name, section, crName }>   (required)
 * - initialSelectedIds: Array<string>                     (optional, default [])
 * - isAuthenticated: boolean                               (required)
 * - onSave: (ids: string[]) => Promise<void>                (required)
 * - onRequireAuth: (ids: string[]) => void                  (required)
 * - onSaved: () => void                                     (optional)
 *
 * USAGE
 *   <CourseSelector
 *     courses={courses}
 *     initialSelectedIds={user ? user.enrolledCourseIds : pendingSelection}
 *     isAuthenticated={!!user}
 *     onSave={async (ids) => { await api.saveMyCourses(ids); }}
 *     onRequireAuth={(ids) => { stagePendingSelection(ids); openAuthModal("login"); }}
 *     onSaved={() => navigate("/dashboard")}
 *   />
 * ------------------------------------------------------------------
 */

import React, { useState } from "react";
import "./style.css";
export default function CourseSelector({
  courses,
  initialSelectedIds = [],
  isAuthenticated,
  onSave,
  onRequireAuth,
  onSaved,
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(() => new Set(initialSelectedIds));
  const [busy, setBusy] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [error, setError] = useState("");

  const filtered = courses.filter((c) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      c.code.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      (c.section || "").toLowerCase().includes(q) ||
      (c.crName || "").toLowerCase().includes(q)
    );
  });

  function toggle(courseId) {
    setSavedMessage("");
    setError("");
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(courseId)) next.delete(courseId);
      else next.add(courseId);
      return next;
    });
  }

  function remove(courseId) {
    toggle(courseId);
  }

  async function handleSave() {
    const ids = Array.from(selected);
    if (ids.length === 0) return;

    if (!isAuthenticated) {
      onRequireAuth(ids);
      return;
    }

    setBusy(true);
    setError("");
    try {
      await onSave(ids);
      setSavedMessage("Saved.");
      if (onSaved) onSaved();
    } catch (err) {
      setError("Couldn't save your selection. Try again.");
    } finally {
      setBusy(false);
    }
  }

  const selectedCourses = courses.filter((c) => selected.has(c.id));

  return (
    <div className="course-selector">
      <div className="form-field browse-search">
        <label htmlFor="course-selector-search">Search</label>
        <input
          id="course-selector-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by code, course name, section, or CR"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="browse-empty">No courses match "{query}".</p>
      ) : (
        <ul className="course-select-list">
          {filtered.map((course) => {
            const isSelected = selected.has(course.id);
            return (
              <li
                key={course.id}
                className={"course-select-card" + (isSelected ? " is-selected" : "")}
              >
                <div>
                  <p className="board-course">{course.code}</p>
                  <h3 className="board-name">{course.name}</h3>
                  <p className="course-row-meta">
                    {course.section && <>Section {course.section}</>}
                    {course.section && course.crName && " · "}
                    {course.crName && <>CR {course.crName}</>}
                  </p>
                </div>
                <button
                  type="button"
                  className={"btn " + (isSelected ? "btn-solid" : "btn-ghost")}
                  aria-pressed={isSelected}
                  onClick={() => toggle(course.id)}
                >
                  {isSelected ? "✓ Selected" : "+ Select"}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="selection-tray">
        <div className="selection-tray__inner">
          <div className="selection-tray__chips">
            {selectedCourses.length === 0 ? (
              <span className="selection-tray__empty">
                Nothing selected yet — pick a course above to add it here.
              </span>
            ) : (
              selectedCourses.map((c) => (
                <span className="selection-chip" key={c.id}>
                  {c.code}
                  <button
                    type="button"
                    aria-label={`Remove ${c.code}`}
                    onClick={() => remove(c.id)}
                  >
                    ×
                  </button>
                </span>
              ))
            )}
          </div>
          <div className="selection-tray__action">
            {error && <span className="selection-tray__error">{error}</span>}
            {!error && savedMessage && (
              <span className="selection-tray__saved">{savedMessage}</span>
            )}
            <button
              type="button"
              className="btn btn-solid"
              disabled={selectedCourses.length === 0 || busy}
              onClick={handleSave}
            >
              {busy
                ? "Saving…"
                : isAuthenticated
                ? `Save ${selectedCourses.length || ""} course${
                    selectedCourses.length === 1 ? "" : "s"
                  }`.trim()
                : `Save selection${
                    selectedCourses.length ? ` (${selectedCourses.length})` : ""
                  }`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}