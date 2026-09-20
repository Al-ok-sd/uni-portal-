import { Link } from "react-router-dom";
import CourseSelector from "../Components/course-finder";

const courses = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Programming",
    section: "A",
    crName: "Dr. Smith",
  },
  {
    id: 2,
    code: "MATH201",
    name: "Calculus II",
    section: "B",
    crName: "Prof. Lee",
  },
  {
    id: 3,
    code: "ENG110",
    name: "Academic Writing",
    section: "C",
    crName: "Ms. Thomas",
  },
  {
    id: 4,
    code: "BIO150",
    name: "Cell Biology",
    section: "D",
    crName: "Dr. Ahmed",
  },
];

export default function CourseFinderPage() {
  return (
    <div className="page-shell" style={{ padding: "24px 20px 60px" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/" className="btn btn--ghost">
          ← Back home
        </Link>
      </div>

      <CourseSelector
        courses={courses}
        initialSelectedIds={[1]}
        isAuthenticated={false}
        onSave={async (ids) => {
          console.log("Saved course IDs:", ids);
        }}
        onRequireAuth={(ids) => {
          console.log("Authentication required for:", ids);
        }}
      />
    </div>
  );
}
