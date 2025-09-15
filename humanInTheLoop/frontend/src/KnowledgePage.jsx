import { useState, useEffect } from "react";

function KnowledgePage() {
  const [knowledge, setKnowledge] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/knowledge")
      .then(res => res.json())
      .then(data => setKnowledge(data));
  }, []);

  return (
    <div>
      <h2>Knowledge Base</h2>
      {knowledge.map((k, i) => (
        <div key={i} style={{border:"1px solid gray", padding:"10px", margin:"5px"}}>
          <p><b>Q:</b> {k.question}</p>
          <p><b>A:</b> {k.answer}</p>
        </div>
      ))}
    </div>
  );
}

export default KnowledgePage;
