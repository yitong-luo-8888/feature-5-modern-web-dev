// src/components/ProblemSet/BrowseProblems.js
import React, { useEffect, useState } from "react";
import Parse from "../../parse/ParseConfig";
import { useProblemSet } from "../../context/ProblemSetContext";
import { checkUser } from "../Auth/AuthService";
import { Navigate } from "react-router-dom";

export default function BrowseProblems() {
  // hooks first
  const [problems, setProblems] = useState([]);
  const { addProblem } = useProblemSet();

  useEffect(() => {
    if (!checkUser()) return;               // only fetch when logged in

    const fetchProblems = async () => {
      // 👉 Query the QuestionBank class
      const QuestionBank = Parse.Object.extend("QuestionBank");
      const query         = new Parse.Query(QuestionBank);
      const results       = await query.find();
      setProblems(results);
    };

    fetchProblems();
  }, []);

  if (!checkUser()) {                        // redirect if not authenticated
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div>
      <h3>Browse Test Bank</h3>
      {problems.length === 0 && <p>No questions available yet.</p>}
      {problems.map((p) => (
        <div
          key={p.id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "8px" }}
        >
          {/* 👉 Use the 'question' field, not 'text' */}
          <p>
            <strong>Question:</strong> {p.get("question")}
          </p>
          <button
            onClick={() =>
              addProblem({ id: p.id, question: p.get("question") })
            }
          >
            Add to Challenge
          </button>
        </div>
      ))}
    </div>
  );
}
