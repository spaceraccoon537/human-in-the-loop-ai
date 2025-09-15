import { useState, useEffect } from "react";
import "./KnowledgePage.css"; // import CSS file

function KnowledgePage() {
  const [knowledge, setKnowledge] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/knowledge")
      .then(res => res.json())
      .then(data => setKnowledge(data));
  }, []);

  return (
    <div className="knowledge-container">
      <div className="card">
        <h2 className="title">📚 Knowledge Base</h2>
        {knowledge.length === 0 ? (
          <p className="empty">No learned answers yet.</p>
        ) : (
          <div className="list">
            {knowledge.map((k, i) => (
              <div key={i} className="qa-card">
                <p><b>Q:</b> {k.question}</p>
                <p><b>A:</b> {k.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default KnowledgePage;
