// FAQ Data – Student Promotion System

export const questions = [
  {
    questionId: "01",
    question: "How are students selected for promotion?"
  },
  {
    questionId: "02",
    question: "What is the minimum passing percentage required?"
  },
  {
    questionId: "03",
    question: "Can a failed student be promoted manually?"
  },
  {
    questionId: "04",
    question: "What happens if promotion class or section is not selected?"
  }
];

export const answers = [
  {
    answerId: "01",
    answer:
      "Students are selected for promotion based on their final aggregated results. Only students who achieve a passing status according to the defined percentage criteria are eligible for promotion to the next class."
  },
  {
    answerId: "02",
    answer:
      "The minimum passing percentage required is 40%. Students scoring below 40% are marked as failed and are not eligible for automatic promotion."
  },
  {
    answerId: "03",
    answer:
      "By default, failed students cannot be promoted through the automatic promotion system. However, manual promotion can be implemented by an administrator if required by institutional policy."
  },
  {
    answerId: "04",
    answer:
      "If the promotion class or section is not selected, the system will display 'Not Selected' and promotion cannot be processed until a valid destination class and section are defined."
  }
];
