// Restore saved progress
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitBtn = document.getElementById("submit");

// ---- RENDER QUESTIONS ----
function renderQuestions() {
  questionsElement.innerHTML = "";

  questions.forEach((q, index) => {
    const wrapper = document.createElement("div"); // Cypress expects <div>

    // QUESTION TEXT
    const qText = document.createElement("p");
    qText.textContent = q.question;
    wrapper.appendChild(qText);

    // OPTIONS
    q.choices.forEach(choice => {
      const option = document.createElement("input");
      option.type = "radio";
      option.name = `question-${index}`;
      option.value = choice;

      // Restore saved selection
      if (userAnswers[index] === choice) option.checked = true;

      option.addEventListener("change", () => {
        userAnswers[index] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      wrapper.appendChild(option);
      wrapper.appendChild(document.createTextNode(choice));
    });

    questionsElement.appendChild(wrapper); // critical for Cypress
  });
}

// ---- SUBMIT ----
submitBtn.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, index) => {
    if (userAnswers[index] === q.answer) score++;
  });

  scoreElement.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});

// ---- RESTORE SCORE ----
const storedScore = localStorage.getItem("score");
if (storedScore) {
  scoreElement.textContent = `Your score is ${storedScore} out of 5.`;
}

// Initial load
renderQuestions();
