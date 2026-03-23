// RenderQuiz class, anything about design and display
class RenderQuiz {

    /** @type {QuizTimer | null} */
    #quizTimer = null;
     /** @type {Question | null} */
    #currentQuestion = null;
    
    /**
     * 
     * @param {Question} currentQuestion 
     */
    constructor(currentQuestion) {
        this.#currentQuestion = currentQuestion;
    }

    /** Renders the question and its answers on the screen
     * 
     * @param {Question} question The question object to display
     */
    renderQuestion(question) {
        // Remove iris overlay at new question
        document.getElementById("iris-overlay")?.remove();
        
        const questionBlock = document.getElementById("questionBlock");
        questionBlock.style.display = "block";
        questionBlock.innerHTML = "";
        questionBlock.classList.add("question-block");

        // console.log(question.id, question.lockedLetters);
        // console.log("Questionorder = " + quiz.questionOrder);
        this.#currentQuestion = question;

        // bc for corners
        const bc = document.createElement("div");
        bc.className = "bc";
        questionBlock.appendChild(bc);

        // Glow line + bar
        const { glow, bar } = this.createQuestionBar("Mission Query");
        questionBlock.appendChild(glow);
        questionBlock.appendChild(bar);

        // Content wrapper
        const questionContent = document.createElement("div");
        questionContent.className = "question-content";
        // Question title container
        const questionValue = document.createElement("h5");
        questionValue.id = "questionValue";
        questionValue.className = "title";
        // Error message container
        const errorMsg = document.createElement("h5");
        errorMsg.id = "errorMsg";
        errorMsg.className = "error text-center";
        // Answer container
        const answerValue = document.createElement("div");
        answerValue.id = "answerValue";
        answerValue.className = "answer-area";
        // Trivia container
        const trivia = document.createElement("div");
        trivia.id = "trivia";

        questionContent.appendChild(questionValue);
        questionContent.appendChild(errorMsg);
        questionContent.appendChild(answerValue);
        questionContent.appendChild(trivia);
        questionBlock.appendChild(questionContent);

        // Add question title
        document.getElementById("questionValue").innerText = question.title;
    
        // Get the Answer container
        const container = document.getElementById("answerValue");

        // Clear old answers
        container.innerHTML = ""; 

        // Get answers array
        const answers = question.answers; 
    
        // Display the locked letters when a question was answered
        if (question.isAnswered) {
            this.displayLockedLetters(question.lockedLetters); 
        }
        // Display iris if timer expired
        if (question.isExpired) {
            this.displayIrisOverlay();
        }
        
        // Create Radiobuttons for the answers
        for (let i = 0; i < answers.length; i++) {
            let label = document.createElement("label");
            let radio = document.createElement("input");
            label.className = "label-for-answer label-design py-1 mb-1";
            radio.type = "radio";
            radio.name = "question";
            radio.value = answers[i];
            label.appendChild(radio);
            label.append(" " + answers[i]);
            container.appendChild(label);
            
            // Click on a answer
            radio.addEventListener("click", (event) => {
                question.lockedLetters = this.#quizTimer.lockedLetters;  
                this.#quizTimer.stopTimer(); 
                this.#quizTimer.lockRevealedBlocks();
                // Get the answer value of the click
                question.selectedAnswer = event.target.value;
                // Show green color and add trivia at correct answer, show red on incorrect answer
                this.displayAnswerResult(event.target.value, event.target.parentElement);
            });

            // Restores previous answer and styling
            if (question.isAnswered) {
                radio.disabled = true;  
            }
            // Re-check the radio the user previously picked
            if (answers[i] === question.selectedAnswer) {
                radio.checked = true;
                // Re-apply correct/incorrect color to the label
                if (question.wasCorrect) {
                    this.displayCorrect(label);
                } 
                else {
                    this.displayIncorrect(label);
                }
            }  
        }
    }

    /** Checks the selected answer and displays the correct(with trivia)/incorrect result
     * 
     * @param {string} selectedAnswer The answer value the user selected
     * @param {HTMLElement} htmlElement The html element to apply correct/incorrect styling to
     */
    displayAnswerResult(selectedAnswer, htmlElement) {
        if (this.#currentQuestion.checkAnswer(selectedAnswer) === true) {
            this.displayCorrect(htmlElement);
            this.addTrivia();
        } 
        else {
            this.displayIncorrect(htmlElement);
        }
        this.lockAnswer();
    }

    // addTrivia() {
    //     document.getElementById("trivia").innerText = this.#currentQuestion.answerTrivia;
    // }

    addTrivia() {
        const triviaContainer = document.getElementById("trivia");
        // Get the trivia for the current question
        const text = this.#currentQuestion.answerTrivia;
        triviaContainer.appendChild(this.createTriviaBlock(text));
    }

    /** Puts every sentence that ends with a . into a new paragraph and into a div
     * 
     * @param {string} text Enter the text you want to insert
     * @returns Trivia box with sentences each in a paragraph
     */
    createTriviaBlock(text) {
        // Outer container
        const triviaBox = document.createElement("div");
        triviaBox.className = "trivia-block";

        // Accent line
        const accent = document.createElement("div");
        accent.className = "trivia-accent";
        triviaBox.appendChild(accent);

        // Title
        const title = document.createElement("h5");
        title.className = "trivia-title";
        title.textContent = "⊗ Trivia";
        triviaBox.appendChild(title);

        // Sentences
        const sentences = text.split(". ");
        for (let i = 0; i < sentences.length; i++) {
            const p = document.createElement("p");
            p.className = "light";
            p.textContent = sentences[i].trim() + ".";
            triviaBox.appendChild(p);
        }

        return triviaBox;
    }

    // clearTrivia() {
    //     document.getElementById("trivia").innerText = "";
    // }

    clearTrivia() {
    const trivia = document.getElementById("trivia");
        if (trivia) {
            trivia.innerText = "";
        }
    }


    /**
     * 
     * @param {HTMLElement} htmlElement The element you want to apply the class to
     */
    displayCorrect(htmlElement) {
        htmlElement.classList.add("correct");
    }

    /**
     * 
     * @param {HTMLElement} htmlElement The element you want to apply the class to
     */
    displayIncorrect(htmlElement) {
        htmlElement.classList.add("incorrect");
    }

    /** Create the questionbar design
     * 
     * @param {string} title What the title of the bar is
     * @returns Design of the questionbar parts
     */
  createQuestionBar(title) {
        document.querySelector(".question-glow")?.remove();
        document.querySelector(".question-bar")?.remove();

        const glow = document.createElement("div");
        glow.className = "question-glow";

        const bar = document.createElement("div");
        bar.className = "question-bar";

        const tab = document.createElement("div");
        tab.className = "question-bar-tab";

        const rune = document.createElement("span");
        rune.className = "question-bar-rune";
        rune.textContent = "⊕";

        const label = document.createElement("span");
        label.className = "question-bar-text";
        label.textContent = title;

        tab.appendChild(rune);
        tab.appendChild(label);

        const rest = document.createElement("div");
        rest.className = "question-bar-rest";

        const meta = document.createElement("span");
        meta.className = "question-bar-meta";
        meta.textContent = "SGC // LEVEL 5";

        rest.appendChild(meta);
        bar.appendChild(tab);
        bar.appendChild(rest);

        return { glow, bar };
    }

    createPreviousButton() {
    const previousButton = document.getElementById("previousButton");
    previousButton.innerHTML = "";
    const button = document.createElement("button");
        button.type = "button";
        button.name = "Previous Button";
        button.className = "position-btn";
        button.textContent = "Previous";
        previousButton.append(button);
    }

    createNextButton() {
    const nextButton = document.getElementById("nextButton");
    nextButton.innerHTML = "";
    const button = document.createElement("button");
        button.type = "button";
        button.name = "Next Button";
        button.className = "position-btn";
        button.textContent = "Next";
        nextButton.append(button);
    }

    createFinishButton() {
    const finishButton = document.getElementById("finishButton");
    finishButton.innerHTML = "";
    const button = document.createElement("button");
        button.type = "button";
        button.name = "Finish Button";
        button.className = "position-btn";
        button.textContent = "Finish Quiz";
        finishButton.append(button);
    }

    /** Show which index number of the question list you are on (example: 3 of 10)
     * 
     * @param {number} currentIndex Needs the currentindex of quiz class
     * @param {number} numberOfQuestions How many questions in the array
     */
    displayIndex(currentIndex, numberOfQuestions) {
        document.getElementById("indexQuestion").innerText = "Question: " + (currentIndex + 1) + " of " + (numberOfQuestions);
    }

    /** This hides the previous button at start and the next button at end
     * 
     * @param {number} currentIndex Needs the currentindex of quiz class
     * @param {number} numberOfQuestions How many questions in the array
     */
    updateButtonVisibility(currentIndex, numberOfQuestions) {
        // Hide Previous if at first question
        if (currentIndex === 0) {
            previousButton.style.visibility = "hidden";
        } 
        else {
            previousButton.style.visibility = "visible";
        }
        // Hide Next if at last question
        if (currentIndex === numberOfQuestions - 1) {
            nextButton.style.visibility = "hidden";
        }
        else {
            nextButton.style.visibility = "visible"
        }
    }

     /** This creates and displays the finish button at the end of the quiz
     * 
     * @param {number} currentIndex Needs the currentindex of quiz class
     * @param {number} numberOfQuestions How many questions in the array
     */
    displayFinishButton(currentIndex, numberOfQuestions) {
        const Index = currentIndex + 1;
            if (Index === numberOfQuestions) {
            this.createFinishButton();
        } 
    }
    
    lockAnswer() {
    const checkedButton = document.getElementsByName('question');
        // Loop through the radiobuttons to see which one is checked
        for (let i = 0; i < checkedButton.length; i++) {
        // If its checked > disable the buttons	

            // (checkedButton[i].disabled = true)	
            if(checkedButton[i].checked) {
                checkedButton[i].disabled = true;
            }
            else {
                checkedButton[i].disabled = true;
            }
        }
    }

    displayError() {
        const errorMsg = document.getElementById("errorMsg")
        const alertScreen = document.getElementById("answerValue");

        errorMsg.innerText = "Please pick an answer.";
        renderQuiz.displayIncorrect(alertScreen);

        setTimeout(function() {
            alertScreen.classList.remove("incorrect");
            // start fade out
            errorMsg.classList.add("hidden");         
            setTimeout(() => {
                // clear text
                errorMsg.innerText = "";
                // reset             
                errorMsg.classList.remove("hidden"); 
            }, 300); 
        }, 1200);
    }

    /** Return the questions based on the current shuffled questionOrder in a array
     * 
     * @param {number[]} orderedQuestion The order of the questions in questionorder
     */
    displayEndResult(orderedQuestion) {
        const container = document.getElementById("addResult");
        container.innerHTML = ""; 

        let debriefContainer = document.createElement("div");
        let debriefTitle = document.createElement("h5");
        debriefContainer.className = "light primary-bg border p-2";
        debriefTitle.className = "title light text-center py-1";
        debriefTitle.innerText = "Mission Debrief"

        container.appendChild(debriefContainer);
        debriefContainer.appendChild(debriefTitle);
        
        // For every question
        for (let i = 0; i < orderedQuestion.length; i++) {
            let block = document.createElement("div");
            let blockIcon = document.createElement("div");
            let questionNumberContainer = document.createElement("div");
            let questionContainer = document.createElement("div");
            let questionAnswer = document.createElement("p")
            let questionTitle = document.createElement("h5")

            block.id = "question-" + i;
            block.className = "result-block d-flex d-flex justify-center items-center my-1";

            questionNumberContainer.className = "small p-2";
            questionNumberContainer.innerText = (i + 1) + ".";
           
            questionContainer.className = "flex-1 p-2";
            questionTitle.className = "light end-result-text";
            questionTitle.textContent = orderedQuestion[i].title;

            questionAnswer.className = "small";

            const answerLabel = document.createElement("span");
            answerLabel.style.color = "var(--tertiary-color)";
            answerLabel.textContent = "Your answer: ";

            const answerText = document.createElement("span");
            answerText.style.color = "var(--font-color-light2)";
            answerText.textContent = orderedQuestion[i].selectedAnswer;

            questionAnswer.appendChild(answerLabel);
            questionAnswer.appendChild(answerText);

            blockIcon.className = "icon-block light d-flex justify-center items-center";
            blockIcon.textContent = orderedQuestion[i].wasCorrect ? "✓" : "✗";
            blockIcon.style.color = orderedQuestion[i].wasCorrect ? "var(--correct-color)" : "var(--error-color)";

            block.appendChild(questionNumberContainer);
            block.appendChild(questionContainer);
            block.appendChild(blockIcon);
            questionContainer.appendChild(questionTitle);
            questionContainer.appendChild(questionAnswer);
            debriefContainer.appendChild(block);

            if(orderedQuestion[i].wasCorrect) {
                this.displayCorrect(block);
            }
            else {
                this.displayIncorrect(block);
            }
        }
    }

    /** Checks which answers wascorrect out of lotal questions
     * 
     * @param {number} correctAmount Amount of correct questions
     * @param {number} numberOfQuestions How many questions in total
     */
    displayScore(correctAmount, numberOfQuestions) {
        const container = document.getElementById("displayScore");
        container.classList.remove("hidden");
        container.innerHTML = ""; 

        let block = document.createElement("div");
        block.id = "scoreBoard";
        block.className = "score-block d-flex items-center justify-center p-3";
        container.appendChild(block);

        block.innerText = "Score: " + (correctAmount) + " of " + (numberOfQuestions);
    }

    /**
     * Starts the animated timer
     * @param {Question} question The question object
     */
    startTimer (question) {
        // Does timer exist
        if (this.#quizTimer) {
            // Store when empty, to stop writing over
            if (question.lockedLetters.length === 0) {
                question.lockedLetters = this.#quizTimer.lockedLetters;
            }
            // reset the timer
            this.#quizTimer.reset();
        }
        this.#quizTimer = new QuizTimer();
        this.#quizTimer.start();
        // Callback function
        this.#quizTimer.onExpired(() => {
            this.#quizTimer.stopTimer();
            this.#currentQuestion.lockedLetters = this.#quizTimer.lockedLetters;
            this.#currentQuestion.isExpired = true;
            this.#currentQuestion.isAnswered = true;
            console.log("Time's up! Engage Iris.")
            this.lockAnswer();
            this.displayIrisOverlay();
        });
    }

    displayIrisOverlay() {
        const content = document.getElementById("questionBlock");
        const overlay = document.createElement("div");
        overlay.id = "iris-overlay";
        overlay.className = "iris-overlay";

        const msg = document.createElement("span");
        msg.className = "iris-msg";
        msg.textContent = "⊗ IRIS ENGAGED";
        overlay.appendChild(msg);
        content.appendChild(overlay);
    }
    
    /** Stop the timer and display the locked letters
     * 
     * @param {string[]} lockedLetters The letters that the timer saves per question in a array
     */
    displayLockedLetters(lockedLetters) {
        if (this.#quizTimer) {
            // Reset the timer
            this.#quizTimer.reset();
            // Display the blocks without letters
            this.#quizTimer.startStatic();
        }
        // Loop through and add the lockedletters to the blocks
        for (let i = 0; i < lockedLetters.length; i++) {
            const block = document.getElementById("block-" + i);
            if (block) {
                block.textContent = lockedLetters[i];
                this.#quizTimer.displayOrange(block); 
            }
        }
    }
}