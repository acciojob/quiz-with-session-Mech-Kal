// -------------------- QUESTIONS DATA --------------------
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// -------------------- RESTORE PROGRESS --------------------
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// DOM elements
const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitBtn = document.getElementById("submit");


// -------------------- RENDER QUESTIONS --------------------
function renderQuestions() {
  questionsElement.innerHTML = ""; // Important: clean container first

  questions.forEach((q, index) => {
    const wrapper = document.createElement("div"); // Cypress checks div children

    const p = document.createElement("p");
    p.textContent = q.question;
    wrapper.appendChild(p);

    q.choices.forEach(choice => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${index}`;
      input.value = choice;

      if (userAnswers[index] === choice) {
        input.checked = true; // restore saved progress
      }

      input.addEventListener("change", () => {
        userAnswers[index] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      wrapper.appendChild(input);
      wrapper.appendChild(document.createTextNode(choice));
    });

    questionsElement.appendChild(wrapper);
  });
}


// -------------------- SUBMIT SCORE --------------------
submitBtn.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, index) => {
    if (userAnswers[index] === q.answer) score++;
  });

  scoreElement.textContent = `Your score is ${score} out of 5.`;

  localStorage.setItem("score", score);
});


// -------------------- RESTORE SAVED SCORE --------------------
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of 5.`;
}


// -------------------- INITIAL RENDER --------------------
renderQuestions();
