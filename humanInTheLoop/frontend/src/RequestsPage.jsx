import { useState, useEffect } from "react";

function RequestsPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/requests")
      .then(res => res.json())
      .then(data => setRequests(data));
  }, []);

  const submitAnswer = (id, answer) => {
    fetch(`http://localhost:5000/api/requests/${id}/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer }),
    }).then(() => {
      setRequests(prev => prev.map(r => r._id === id ? { ...r, status: "RESOLVED", answer } : r));
    });
  };

  return (
    <div>
      <h2>Pending Requests</h2>
      {requests.map(r => (
        <div key={r._id} style={{border:"1px solid black", padding:"10px", margin:"5px"}}>
          <p><b>Q:</b> {r.question}</p>
          <p><b>Status:</b> {r.status}</p>
          {r.status === "PENDING" ? (
            <input
              type="text"
              placeholder="Enter answer"
              onKeyDown={(e) => {
                if (e.key === "Enter") submitAnswer(r._id, e.target.value);
              }}
            />
          ) : (
            <p><b>A:</b> {r.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default RequestsPage;
