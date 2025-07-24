// src/components/ProblemSet/AvailableChallenges.js
import React, { useEffect, useState } from "react";
import Parse from "../../parse/ParseConfig";
import { checkUser } from "../Auth/AuthService";
import { Navigate, useNavigate } from "react-router-dom";

export default function AvailableChallenges() {
  const [createdChallenges, setCreatedChallenges] = useState([]);
  const [availableChallenges, setAvailableChallenges] = useState([]);
  const [doneIds, setDoneIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!checkUser()) return;
      const currentUser = Parse.User.current();

      // 1) Sets already taken
      const Submission = Parse.Object.extend("Submission");
      const subQ = new Parse.Query(Submission);
      subQ.equalTo("user", currentUser);
      const subs = await subQ.find();
      setDoneIds(subs.map((s) => s.get("problemSet").id));

      // 2) Fetch all sets (no include needed for creatorName)
      const ProblemSet = Parse.Object.extend("ProblemSet");
      const psQ = new Parse.Query(ProblemSet);
      const allSets = await psQ.find();

      // 3) Split into mine vs open
      const mine = [], open = [];
      allSets.forEach((set) => {
        const creator = set.get("createdBy");
        const isMine = creator && creator.id === currentUser.id;
        const isDone = doneIds.includes(set.id);

        if (isMine) {
          mine.push(set);
        } else if (!isDone) {
          open.push(set);
        }
      });

      setCreatedChallenges(mine);
      setAvailableChallenges(open);
    };

    fetchData();
  }, [doneIds]);

  if (!checkUser()) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div>
      <h2>My Created Challenges</h2>
      {createdChallenges.length === 0 && <p>No challenges created yet.</p>}
      {createdChallenges.map((c) => (
        <div
          key={c.id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
            background: "#f9f9f9",
          }}
        >
          <p><strong>Title:</strong> {c.get("title")}</p>
        </div>
      ))}

      <h2>Available Challenges</h2>
      {availableChallenges.length === 0 && <p>No available challenges.</p>}
      {availableChallenges.map((c) => (
        <div
          key={c.id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
          <p><strong>Title:</strong> {c.get("title")}</p>
          <button onClick={() => navigate(`/challenge/${c.id}`)}>
            Take Challenge
          </button>
        </div>
      ))}
    </div>
  );
}
