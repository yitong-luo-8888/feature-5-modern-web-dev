// src/components/ProblemSet/TakeChallenge.js
import React, { useEffect, useState } from "react";
import Parse from "../../parse/ParseConfig";
import { checkUser } from "../Auth/AuthService";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function TakeChallenge() {
  const { id } = useParams();          // the ProblemSet id
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers]     = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadRandomThree = async () => {
      if (!checkUser()) return;

      const Q = Parse.Object.extend("Question");
      const count = await new Parse.Query(Q).count();
      const qQ = new Parse.Query(Q);

      // If fewer than 3 total, just load all
      if (count <= 3) {
        qQ.limit(count);
      } else {
        // pick a random skip so we get 3 consecutive
        const maxSkip = count - 3;
        const skip = Math.floor(Math.random() * (maxSkip + 1));
        qQ.skip(skip).limit(3);
      }

      const qs = await qQ.find();
      setQuestions(qs);
    };

    loadRandomThree();
  }, [id]);

  if (!checkUser()) {
    return <Navigate to="/auth/login" replace />;
  }

  // still loading?
  if (questions === null) {
    return <p>Loading questions…</p>;
  }
  // no questions at all
  if (questions.length === 0) {
    return <p>No questions in the bank.</p>;
  }

  const currentUser = Parse.User.current();

  const selectAnswer = (qId, idx) =>
    setAnswers((a) => ({ ...a, [qId]: idx }));

  const handleSubmit = async () => {
    // compute score
    let score = 0;
    questions.forEach((q) => {
      const correct = q.get("correctIndex");
      if (answers[q.id] === correct) score += 1;
    });

    // record Submission
    const PS = Parse.Object.extend("ProblemSet");
    const Submission = Parse.Object.extend("Submission");
    const sub = new Submission();
    sub.set("user", currentUser);
    sub.set("problemSet", PS.createWithoutData(id));
    sub.set("challengerName", currentUser.get("username") || currentUser.id);
    sub.set("score", score);
    sub.set("timestamp", new Date());

    await sub.save();
    navigate("/available");  // back to available list
  };

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  return (
    <div>
      <h2>Take Challenge (3 Random Questions)</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {questions.map((q, i) => (
          <fieldset key={q.id} style={{ marginBottom: 16 }}>
            <legend>
              {i + 1}. {q.get("text")}
            </legend>
            {q.get("options").map((opt, idx) => (
              <label key={idx} style={{ display: "block", margin: "4px 0" }}>
                <input
                  type="radio"
                  name={q.id}
                  value={idx}
                  checked={answers[q.id] === idx}
                  onChange={() => selectAnswer(q.id, idx)}
                  required
                />
                {opt}
              </label>
            ))}
          </fieldset>
        ))}

        <button
          type="submit"
          disabled={!allAnswered}
          style={{ padding: "8px 16px" }}
        >
          Submit & Record Score
        </button>
      </form>
    </div>
  );
}
