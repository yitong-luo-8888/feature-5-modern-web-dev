import React, { useState } from "react";
import Parse from "../../parse/ParseConfig";

// This component lets users contribute SAT questions to the public test bank
export default function QuestionContributionForm() {
  const [formData, setFormData] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctIndex: 0,
    topic: "",
    difficulty: "Medium"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("option")) {
      const index = parseInt(name.replace("option", ""));
      const newOptions = [...formData.options];
      newOptions[index] = value;
      setFormData({ ...formData, options: newOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const Question = new Parse.Object("Question");
      Question.set("text", formData.questionText);
      Question.set("options", formData.options);
      Question.set("correctIndex", Number(formData.correctIndex));
      Question.set("topic", formData.topic);
      Question.set("difficulty", formData.difficulty);
      await Question.save();
      alert("Question submitted successfully!");
      setFormData({
        questionText: "",
        options: ["", "", "", ""],
        correctIndex: 0,
        topic: "",
        difficulty: "Medium"
      });
    } catch (err) {
      console.error("❌ Submission error:", err);
      alert("Failed to submit question.");
    }
  };

  return (
    <div className="contribution-form">
      <h3>Contribute a SAT Question</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          name="questionText"
          placeholder="Enter question text..."
          value={formData.questionText}
          onChange={handleChange}
          required
        />

        {formData.options.map((opt, idx) => (
          <input
            key={idx}
            type="text"
            name={`option${idx}`}
            placeholder={`Option ${idx + 1}`}
            value={opt}
            onChange={handleChange}
            required
          />
        ))}

        <label>
          Correct Answer Index (0-3):
          <input
            type="number"
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
            min="0"
            max="3"
            required
          />
        </label>

        <input
          type="text"
          name="topic"
          placeholder="e.g., Algebra, Geometry"
          value={formData.topic}
          onChange={handleChange}
        />

        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <button type="submit">Submit Question</button>
      </form>
    </div>
  );
}
