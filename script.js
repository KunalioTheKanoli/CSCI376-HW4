// 1. Add a fourth question to the questions data structure that has three incorrect answers and one correct answer. 
const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Madrid", correct: false },
        { text: "Berlin", correct: false },
        { text: "Paris", correct: true },
        { text: "Rome", correct: false }
      ]
    },
    {
      question: "Which language runs in a web browser?",
      answers: [
        { text: "Java", correct: false },
        { text: "C", correct: false },
        { text: "Python", correct: false },
        { text: "JavaScript", correct: true }
      ]
    },
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Cascading Style Sheets", correct: true },
        { text: "Colorful Style Scripts", correct: false },
        { text: "Computer Style Sheets", correct: false },
        { text: "Creative Style Syntax", correct: false }
      ]
    },
    {
      question: "Which of these colors is NOT on the flag of India?",
      answers: [
        { text: "Orange", correct: false },
        { text: "Green", correct: false },
        { text: "Indigo", correct: true },
        { text: "Blue", correct: false }
      ]
    }
  ];
  
  // 2. How do we know what id to search for when using document.getElementById()? Where are the following ids specified in index.html? 
  // When using document.getElementById(), we know to search for a particular ID through the HTML code in index.html. Each relevant element
  // has a corresponding attribute in the HTML code. For instance, the question ID is specified in Line 14 in the HTML file, along with
  // Line 15 for the answer button ID and Line 18 for the next button ID. These IDs match with the strings we pass in the document.getElementById()
  // command in the Javascript file, which is why we can do our search. 
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const hintButton = document.getElementById("hint-btn")
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      // 3. Why are these HTML elements being created dynamically in the JS file, while other page elements are defined statically in the HTML file?
      // The HTML elements are created dynamically because the content of the answer buttons changes based on which question is being shown. There
      // is a chance the number of answer buttons can change, too, but not in our case. If these elements were statically created, we would have to 
      // manually code each button for each possible answer. Creating them dynamically gives us more flexibilty and lets us change question data and
      // answers more easily.  
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      // 4. What is the line below doing? 
      // It adds in the button element with its text and classList into the answerButtonsElement. 
      // The line below essentially adds each answer button to the page so the user can see and click it. 
      answerButtonsElement.appendChild(button);
      hintButton.style.display = "block";
      hintButton.disabled = false;
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    hintButton.style.display = "none";
    answerButtonsElement.innerHTML = "";
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("wrong");
    }
  
    Array.from(answerButtonsElement.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    // 5. Why is it important to change the display styling rule for the "Next" button to "block" here? What would happen if you did not have this line?
    // Changing the display styling rule makes the "Next" button visible after the user picks an answer. This lets them move on to the next question.
    // If we didn't put that line in, the "Next" button would stay hidden, meaning the user would be stuck on the same question and couldn't move on to the next one.
    nextButton.style.display = "block";
  }
  
  function showScore() {
    resetState();
    questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
    nextButton.textContent = "Restart";
    nextButton.style.display = "block";
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  
  // 6. Summarize in your own words what you think this block of code is doing. 
  // The block of code is waiting for the user to click the "Next" button. If there
  // are still more questions, which we see with the currentQuestionIndex < questions.length
  // portion, the code calls handleNextButton() to load our next question. Otherwise, once the 
  // user has reached the end of the quiz, startQuiz() is called to restart it from the beginning. 
  // In other words, our block of code determines whether or not to move to the next question or restart
  // once we're on the last question. 
  nextButton.addEventListener("click", () => { 
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });

  hintButton.addEventListener("click", () => {
    const buttons = Array.from(answerButtonsElement.children);
  
    const incorrectButtons = buttons.filter(
      (btn) => btn.dataset.correct !== "true" && !btn.classList.contains("wrong")
    );
  
    if (incorrectButtons.length > 0) {
      const randomIndex = Math.floor(Math.random() * incorrectButtons.length);
      incorrectButtons[randomIndex].classList.add("wrong");
  
      hintButton.disabled = true;
    }
  });
  
  
  startQuiz();
  