// src/components/ProblemSet/EditChallenge.js
import React, { useState } from "react";
import Parse from "../../parse/ParseConfig";
import { useProblemSet } from "../../context/ProblemSetContext";
import { checkUser } from "../Auth/AuthService";
import { Navigate } from "react-router-dom";

const EditChallenge = () => {
  const { selectedProblems, removeProblem, clearProblemSet } = useProblemSet();
  const [title, setTitle] = useState("");

  if (!checkUser()) {
    return <Navigate to="/auth/login" replace />;
  }

  const handleSubmit = async () => {
    const currentUser = Parse.User.current();
    const ProblemSet = Parse.Object.extend("ProblemSet");
    const challenge = new ProblemSet();

    challenge.set("title", title.trim() || "Untitled Challenge");
    challenge.set("problems", selectedProblems.map((p) => p.id));
    challenge.set("createdBy", currentUser);      // ← saving the pointer
    challenge.set("timestamp", new Date());

    await challenge.save();
    clearProblemSet();
    alert(`Challenge "${challenge.get("title")}" created!`);
    setTitle("");
  };

  return (
    <div>
      <h2>Edit Current Challenge</h2>

      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Enter challenge name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: 8,
            width: "100%",
            boxSizing: "border-box",
            fontSize: "1rem",
          }}
        />
      </div>

      {selectedProblems.length === 0 && <p>No problems added yet.</p>}
      {selectedProblems.map((p) => (
        <div key={p.id} style={{ marginBottom: 8 }}>
          <span>{p.question}</span>{" "}
          <button onClick={() => removeProblem(p.id)}>Remove</button>
        </div>
      ))}

      {selectedProblems.length > 0 && (
        <button
          onClick={handleSubmit}
          disabled={!title.trim()}
          style={{ marginTop: 12, padding: "8px 16px" }}
        >
          Create Challenge
        </button>
      )}
    </div>
  );
};

export default EditChallenge;
