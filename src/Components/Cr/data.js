// Sample data for CR Dashboard (replace with real API later)

export const CR_PROFILE = {
  name: "Rafi Ahmed",
  email: "221-15-1234@student.pu.edu.bd",
  courseCode: "CSE 211",
  courseName: "Data Structures And Algorithms",
  section: "Section 1",
  semester: "7th Semester",
};

export const INITIAL_POSTS = [
  {
    id: "p1",
    type: "exam",
    title: "Mid-term examination updated",
    content: "Mid-term moved to Sunday, 10:00 AM — Room 412. Bring calculator. No phones allowed.",
    createdAt: "2h ago",
    author: "Rafi · CR",
  },
  {
    id: "p2",
    type: "material",
    title: "Chapter 6 study materials uploaded",
    content: "Chapter 6 slides and the ER diagram derivation from yesterday's class are now available.",
    createdAt: "Yesterday",
    author: "Rafi · CR",
    fileName: "Chapter6_Slides.pdf",
  },
  {
    id: "p3",
    type: "assignment",
    title: "Assignment 3 – Linked List Implementation",
    content: "Submit the complete Linked List implementation with all required methods by next Wednesday.",
    createdAt: "2 days ago",
    author: "Rafi · CR",
  },
  {
    id: "p4",
    type: "announcement",
    title: "Class cancelled tomorrow",
    content: "Tomorrow's class is cancelled due to faculty meeting. Next class will be on Thursday.",
    createdAt: "3 days ago",
    author: "Rafi · CR",
  },
];

export const POST_TYPES = [
  { value: "exam", label: "Exam", tagClass: "tag-exam" },
  { value: "material", label: "Material", tagClass: "tag-material" },
  { value: "assignment", label: "Assignment", tagClass: "tag-assignment" },
  { value: "announcement", label: "Announcement", tagClass: "tag-announcement" },
];