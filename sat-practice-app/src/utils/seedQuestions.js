// src/utils/seedQuestions.js
import Parse from "../parse/ParseConfig";

const sampleQuestions = [
  {
    question: "What is the solution to 3x - 5 = 16?",
    choices: ["5", "6", "7", "8"],
    answer: "7",
    topic: "Algebra",
    difficulty: "Easy"
  },
  {
    question: "Which of the following is a synonym for 'elated'?",
    choices: ["Angry", "Confused", "Joyful", "Tired"],
    answer: "Joyful",
    topic: "Reading",
    difficulty: "Medium"
  },
  {
    question: "Which sentence is grammatically correct?",
    choices: [
      "Neither of the boys have finished.",
      "Each of the apples are red.",
      "Everyone were excited.",
      "She and I are going to the store."
    ],
    answer: "She and I are going to the store.",
    topic: "Grammar",
    difficulty: "Easy"
  },
  {
    question: "If f(x) = x² - 4x + 3, what is f(2)?",
    choices: ["-1", "0", "1", "2"],
    answer: "-1",
    topic: "Functions",
    difficulty: "Easy"
  },
  {
    question: "What is the main idea of a passage discussing pollution in oceans?",
    choices: [
      "Pollution has little effect on marine life.",
      "Efforts to reduce plastic waste are effective.",
      "Ocean pollution is a serious environmental issue.",
      "Seafood is safe despite pollution."
    ],
    answer: "Ocean pollution is a serious environmental issue.",
    topic: "Reading",
    difficulty: "Medium"
  },
  {
    question: "Which equation has no real solution?",
    choices: ["x² = 4", "x² = -1", "x = 0", "x = 2"],
    answer: "x² = -1",
    topic: "Algebra",
    difficulty: "Medium"
  },
  {
    question: "Choose the correct form: Neither of the books ___ available.",
    choices: ["are", "is", "were", "have been"],
    answer: "is",
    topic: "Grammar",
    difficulty: "Easy"
  },
  {
    question: "If a rectangle has a length of 8 and a width of 3, what is its area?",
    choices: ["11", "24", "22", "20"],
    answer: "24",
    topic: "Geometry",
    difficulty: "Easy"
  },
  {
    question: "What is the slope of the line: y = -2x + 5?",
    choices: ["2", "-2", "5", "-5"],
    answer: "-2",
    topic: "Algebra",
    difficulty: "Easy"
  },
  {
    question: "Which word best replaces 'diligent' in the sentence: 'He was a diligent student.'?",
    choices: ["Lazy", "Careful", "Smart", "Hard-working"],
    answer: "Hard-working",
    topic: "Reading",
    difficulty: "Medium"
  },
  {
    question: "If 4x + 2 = 18, what is x?",
    choices: ["4", "5", "6", "7"],
    answer: "4",
    topic: "Algebra",
    difficulty: "Easy"
  },
  {
    question: "Which number is a solution to x² - 9 = 0?",
    choices: ["-3", "3", "Both -3 and 3", "Neither"],
    answer: "Both -3 and 3",
    topic: "Algebra",
    difficulty: "Easy"
  },
  {
    question: "What is the correct usage?",
    choices: [
      "Its raining outside.",
      "It's raining outside.",
      "Its' raining outside.",
      "Its raining, isn't it."
    ],
    answer: "It's raining outside.",
    topic: "Grammar",
    difficulty: "Easy"
  },
  {
    question: "What is the value of | -10 |?",
    choices: ["-10", "10", "0", "1"],
    answer: "10",
    topic: "Absolute Value",
    difficulty: "Easy"
  },
  {
    question: "What is the next number in the sequence: 2, 4, 8, 16, ...?",
    choices: ["24", "30", "32", "20"],
    answer: "32",
    topic: "Sequences",
    difficulty: "Easy"
  },
  {
    question: "In the sentence 'He ran quickly,' what part of speech is 'quickly'?",
    choices: ["Noun", "Verb", "Adjective", "Adverb"],
    answer: "Adverb",
    topic: "Grammar",
    difficulty: "Easy"
  },
  {
    question: "If a triangle has sides 3, 4, 5, what type is it?",
    choices: ["Equilateral", "Isosceles", "Scalene", "Right triangle"],
    answer: "Right triangle",
    topic: "Geometry",
    difficulty: "Medium"
  },
  {
    question: "Which word best completes the sentence: 'He was ___ about his promotion.'",
    choices: ["elated", "confuse", "angrily", "jump"],
    answer: "elated",
    topic: "Reading",
    difficulty: "Easy"
  },
  {
    question: "Which of these is NOT a prime number?",
    choices: ["2", "3", "9", "7"],
    answer: "9",
    topic: "Math",
    difficulty: "Easy"
  },
  {
    question: "If y = 3x + 2 and y = 2x + 5, what is the value of x?",
    choices: ["1", "2", "3", "4"],
    answer: "3",
    topic: "Algebra",
    difficulty: "Medium"
  }
];

export const resetAndSeedQuestionBank = async () => {
  try {
    // 1. Clear old data
    const QuestionBank = Parse.Object.extend("QuestionBank");
    const query        = new Parse.Query(QuestionBank);
    query.limit(1000); // adjust if you have more than 1000
    const oldEntries   = await query.find();
    if (oldEntries.length) {
      await Parse.Object.destroyAll(oldEntries);
      console.log(`🗑  Deleted ${oldEntries.length} old question(s).`);
    } else {
      console.log("🗑  No existing questions to delete.");
    }

    // 2. Insert fresh data
    for (const q of sampleQuestions) {
      const Q = new QuestionBank();
      Q.set("question",   q.question);
      Q.set("choices",    q.choices);
      Q.set("answer",     q.answer);
      Q.set("topic",      q.topic);
      Q.set("difficulty", q.difficulty);
      await Q.save();
      console.log(`✅ Added: ${q.question}`);
    }
    console.log("🎉 All questions reseeded successfully.");
  } catch (error) {
    console.error("❌ Error resetting and seeding questions:", error);
  }
};