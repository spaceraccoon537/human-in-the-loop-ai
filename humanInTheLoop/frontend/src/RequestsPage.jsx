import { useState, useEffect } from "react";
import "./RequestsPage.css"; // import CSS file

function RequestsPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/requests")
      .then(res => res.json())
      .then(data => setRequests(data));
  }, []);

  const submitAnswer = (id, answer) => {
    if (!answer.trim()) return;
    fetch(`http://localhost:5000/api/requests/${id}/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer }),
    }).then(() => {
      setRequests(prev =>
        prev.map(r => r._id === id ? { ...r, status: "RESOLVED", answer } : r)
      );
    });
  };

  return (
    <div className="requests-container">
      <div className="card">
        <h2 className="title">🧑‍💼 Supervisor Requests</h2>
        {requests.length === 0 ? (
          <p className="empty">No requests yet.</p>
        ) : (
          <div className="list">
            {requests.map(r => (
              <div key={r._id} className="request-card">
                <p><b>Q:</b> {r.question}</p>
                <p>
                  <b>Status:</b>{" "}
                  <span className={`status ${r.status.toLowerCase()}`}>
                    {r.status}
                  </span>
                </p>

                {r.status === "PENDING" ? (
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Enter answer..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          submitAnswer(r._id, e.target.value);
                          e.target.value = "";
                        }
                      }}
                      className="input-box"
                    />
                  </div>
                ) : (
                  <p><b>A:</b> {r.answer}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestsPage;
