//your JS code here.

// ---- Restore saved progress from sessionStorage ----
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// ---- DOM elements ----
const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitBtn = document.getElementById("submit");

// ---- Render all questions and restore checked answers ----
function renderQuestions() {
  questionsElement.innerHTML = ""; // prevent duplicate rendering

  for (let i = 0; i < questions.length; i++) {
    const questionBlock = document.createElement("div");
    const qText = document.createElement("p");
    qText.textContent = questions[i].question;
    questionBlock.appendChild(qText);

    // Render all options
    questions[i].choices.forEach(choice => {
      const option = document.createElement("input");
      option.type = "radio";
      option.name = `question-${i}`;
      option.value = choice;

      // Restore selection from sessionStorage
      if (userAnswers[i] === choice) {
        option.checked = true;
      }

      // Save progress when clicked
      option.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const label = document.createTextNode(choice);

      questionBlock.appendChild(option);
      questionBlock.appendChild(label);
      questionBlock.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionBlock);
  }
}

// ---- Submit quiz and calculate score ----
submitBtn.addEventListener("click", () => {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // Display score
  scoreElement.textContent = `Your score is ${score} out of 5.`;

  // Store score in localStorage
  localStorage.setItem("score", score);
});

// ---- Restore previously saved score (if any) ----
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  scoreElement.textContent = `Your score is ${storedScore} out of 5.`;
}

// ---- Finally render the quiz ----
renderQuestions();
