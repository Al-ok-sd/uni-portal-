import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { CR_PROFILE, INITIAL_POSTS, POST_TYPES } from "./data";

export default function CRDashboard() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [activeTab, setActiveTab] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form state
  const [form, setForm] = useState({
    type: "announcement",
    title: "",
    content: "",
    fileName: "",
  });

  /* ===================== HELPERS ===================== */

  const filteredPosts =
    activeTab === "all"
      ? posts
      : posts.filter((p) => p.type === activeTab);

  const stats = {
    total: posts.length,
    exam: posts.filter((p) => p.type === "exam").length,
    material: posts.filter((p) => p.type === "material").length,
    assignment: posts.filter((p) => p.type === "assignment").length,
  };

  function resetForm() {
    setForm({ type: "announcement", title: "", content: "", fileName: "" });
    setEditingId(null);
    setShowForm(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;

    if (editingId) {
      // Update existing
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? {
                ...p,
                type: form.type,
                title: form.title.trim(),
                content: form.content.trim(),
                fileName: form.fileName || null,
              }
            : p
        )
      );
    } else {
      // Create new
      const newPost = {
        id: "p" + Date.now(),
        type: form.type,
        title: form.title.trim(),
        content: form.content.trim(),
        createdAt: "Just now",
        author: `${CR_PROFILE.name.split(" ")[0]} · CR`,
        fileName: form.fileName || null,
      };
      setPosts((prev) => [newPost, ...prev]);
    }

    resetForm();
  }

  function handleEdit(post) {
    setForm({
      type: post.type,
      title: post.title,
      content: post.content,
      fileName: post.fileName || "",
    });
    setEditingId(post.id);
    setShowForm(true);
  }

  function handleDelete(id) {
    if (window.confirm("Delete this post?")) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  }

  function getTagClass(type) {
    return POST_TYPES.find((t) => t.value === type)?.tagClass || "tag-announcement";
  }

  function getTypeLabel(type) {
    return POST_TYPES.find((t) => t.value === type)?.label || type;
  }

  /* ===================== RENDER ===================== */

  return (
    <div className="cr-dashboard">
      {/* ========== TOP BAR ========== */}
      <header className="cr-topbar">
        <div className="cr-topbar-left">
          <div className="brand" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <span className="brand-mark">CS</span>
            <span>
              Class<span>Schedule</span>
            </span>
          </div>
        </div>

        <div className="cr-topbar-right">
          <div className="cr-user">
            <div className="cr-avatar">
              {CR_PROFILE.name.charAt(0)}
            </div>
            <div>
              <div className="cr-user-name">{CR_PROFILE.name}</div>
              <div className="cr-user-role">Class Representative</div>
            </div>
          </div>
          <button className="btn btn-ghost" onClick={() => navigate("/")}>
            Logout
          </button>
        </div>
      </header>

      <main className="cr-main">
        {/* ========== COURSE HEADER ========== */}
        <div className="cr-course-header">
          <div>
            <div className="board-course">{CR_PROFILE.courseCode}</div>
            <h1 className="cr-course-title">{CR_PROFILE.courseName}</h1>
            <div className="cr-meta">
              <span className="section-badge">{CR_PROFILE.section}</span>
              <span className="cr-meta-text">{CR_PROFILE.semester}</span>
            </div>
          </div>

          <button
            className="btn btn-solid btn-large"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            + New Post
          </button>
        </div>

        {/* ========== STATS ========== */}
        <div className="cr-stats">
          <div className="cr-stat-card">
            <div className="cr-stat-value">{stats.total}</div>
            <div className="cr-stat-label">Total Posts</div>
          </div>
          <div className="cr-stat-card">
            <div className="cr-stat-value">{stats.exam}</div>
            <div className="cr-stat-label">Exams</div>
          </div>
          <div className="cr-stat-card">
            <div className="cr-stat-value">{stats.material}</div>
            <div className="cr-stat-label">Materials</div>
          </div>
          <div className="cr-stat-card">
            <div className="cr-stat-value">{stats.assignment}</div>
            <div className="cr-stat-label">Assignments</div>
          </div>
        </div>

        {/* ========== CREATE / EDIT FORM ========== */}
        {showForm && (
          <div className="cr-form-card">
            <div className="cr-form-header">
              <h2>{editingId ? "Edit Post" : "Create New Post"}</h2>
              <button className="modal-close" onClick={resetForm}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="cr-form">
              <div className="form-field">
                <label>Type</label>
                <div className="cr-type-buttons">
                  {POST_TYPES.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      className={`cr-type-btn ${form.type === t.value ? "active" : ""}`}
                      onClick={() => setForm({ ...form, type: t.value })}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="postTitle">Title</label>
                <input
                  id="postTitle"
                  type="text"
                  placeholder="e.g. Mid-term exam schedule updated"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="postContent">Content</label>
                <textarea
                  id="postContent"
                  rows={4}
                  placeholder="Write the full details here..."
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="postFile">Attachment (optional)</label>
                <input
                  id="postFile"
                  type="text"
                  placeholder="e.g. Chapter6_Slides.pdf (or leave empty)"
                  value={form.fileName}
                  onChange={(e) => setForm({ ...form, fileName: e.target.value })}
                />
              </div>

              <div className="cr-form-actions">
                <button type="button" className="btn btn-ghost" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-solid">
                  {editingId ? "Update Post" : "Publish Post"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========== TABS + POSTS ========== */}
        <div className="cr-posts-section">
          <div className="board-tabs">
            <button
              className={activeTab === "all" ? "active" : ""}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={activeTab === "exam" ? "active" : ""}
              onClick={() => setActiveTab("exam")}
            >
              Exams
            </button>
            <button
              className={activeTab === "material" ? "active" : ""}
              onClick={() => setActiveTab("material")}
            >
              Materials
            </button>
            <button
              className={activeTab === "assignment" ? "active" : ""}
              onClick={() => setActiveTab("assignment")}
            >
              Assignments
            </button>
            <button
              className={activeTab === "announcement" ? "active" : ""}
              onClick={() => setActiveTab("announcement")}
            >
              Announcements
            </button>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="cr-empty">
              No posts yet. Click “+ New Post” to create the first one.
            </div>
          ) : (
            <div className="cr-posts-list">
              {filteredPosts.map((post) => (
                <div className="notice-card cr-post-card" key={post.id}>
                  <div className="notice-icon">
                    {post.type === "exam" && "📝"}
                    {post.type === "material" && "📄"}
                    {post.type === "assignment" && "📌"}
                    {post.type === "announcement" && "📢"}
                  </div>

                  <div className="notice-content">
                    <div className="notice-meta">
                      <span>{post.author}</span>
                      <span>{post.createdAt}</span>
                    </div>

                    <h3>{post.title}</h3>
                    <p>{post.content}</p>

                    {post.fileName && (
                      <div className="cr-file">
                        📎 {post.fileName}
                      </div>
                    )}

                    <div className="cr-post-footer">
                      <span className={`notice-tag ${getTagClass(post.type)}`}>
                        {getTypeLabel(post.type)}
                      </span>

                      <div className="cr-post-actions">
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => handleEdit(post)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-ghost btn-sm danger"
                          onClick={() => handleDelete(post.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}