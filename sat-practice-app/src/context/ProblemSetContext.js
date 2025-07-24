import React, { createContext, useContext, useState } from "react";

const ProblemSetContext = createContext();

// Named export for provider
export function ProblemSetProvider({ children }) {
  const [selectedProblems, setSelectedProblems] = useState([]);

  // Only add if it doesn’t already exist
  function addProblem(problem) {
    setSelectedProblems((prev) => {
      // if same ID already in array, don’t re-add
      if (prev.some((p) => p.id === problem.id)) {
        return prev;
      }
      return [...prev, problem];
    });
  }
  const removeProblem = (id) =>
    setSelectedProblems((prev) => prev.filter((p) => p.id !== id));
  const clearProblemSet = () => setSelectedProblems([]);

  return (
    <ProblemSetContext.Provider
      value={{ selectedProblems, addProblem, removeProblem, clearProblemSet }}
    >
      {children}
    </ProblemSetContext.Provider>
  );
}

// Named export for hook
export function useProblemSet() {
  const context = useContext(ProblemSetContext);
  if (!context) {
    throw new Error(
      "useProblemSet must be used within a ProblemSetProvider"
    );
  }
  return context;
}
