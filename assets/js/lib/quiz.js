// Quiz class, anything for running the quiz.
class Quiz {
    #currentIndex = 0;
    #questions = [];
    #currentScore = 0;
    #questionOrder = [];
    constructor(){
        
    }

    // this function returns the question based on id
    /**
     * 
     * @param {number} id 
     * @returns {Question}
     */
    #getQuestion(id) {
        // loop through the questions
        for (let i = 0; i < this.#questions.length; i++) {
            let question = this.#questions[i];
            // check id parameter value and check which question has that id
                if (id == question.id) {
                    return question;
                }
            } 
            return null;
    }
    
    // Return the questions based on the current shuffled questionOrder in a array
    getOrderedQuestions() {
        let orderedQuestions = [];

        for (let i = 0; i < this.#questionOrder.length; i++) {
            // grab the ID at that position in the shuffled order
            const questionId = this.#questionOrder[i];
            orderedQuestions.push(this.#getQuestion(questionId));
        }
        return orderedQuestions;
    }

    storeQuizData() {
        let output = [];

        for (let i = 0; i < this.#questionOrder.length; i++) {
            // grab the ID at that position in the shuffled order
            const questionId = this.#questionOrder[i];
            output.push(this.#getQuestion(questionId).createJson());
        }
        sessionStorage.setItem("data", JSON.stringify(output));
        console.log(sessionStorage.getItem("data"))
    }

    /**
     * Load in JSON string
     * @param {string} dataQuestions loop through the json data and create new questions with the class Question
     */
    loadData(dataQuestions){
        for (let i = 0; i < dataQuestions.length; i++) {
            let question = dataQuestions[i];
            this.#questions.push(new Question(
                question.id,
                question.title,
                question.answers,
                question.correctAnswer,
                question.isAnswered,
                question.wasCorrect,
                question.ranOutTime,
                question.selectedAnswer,
                question.answerTrivia,
            )) 
            // create questionOrder id/values 1 tm 10 
            this.#questionOrder.push(question.id); 
        } 
        // console.log(this.#questions, this.#questionOrder);
    }

    /**
     * Resets the quiz and returns the first question of the new shuffled order
     * @returns {Question} The first question of the shuffled order
     */
    restart() {
        this.#currentIndex = 0;
        this.#currentScore = 0;
        // loop through the questions and reset all 
        for (let i = 0; i < this.#questions.length; i++) {
        this.#questions[i].reset();
        }
        // shuffle questionOrder, randomize the questions
        this.#questionOrder = _.shuffle(this.#questionOrder);
        return this.#getQuestion(this.#questionOrder[0]);
    }

    nextQuestion() {
        if (this.#currentIndex < this.#questionOrder.length - 1) {
            this.#currentIndex++;
        }
        // Get the current index, Use that number to look up the value at that numbers position in the question order array. That value become the question ID. 
        // ex: currentindex = 3, get position 3 in the questionOrder array and return the value of that position, say nr 8. That becomes question ID 8.
        return this.#getQuestion(this.#questionOrder[this.#currentIndex]);
    }

    previousQuestion() {
        if (this.#currentIndex > 0) {
            this.#currentIndex--;
        }
        // Get the current index, Use that number to look up the value at that numbers position in the question order array. That value become the question ID. 
        // ex: currentindex = 3, get position 3 in the questionOrder array and return the value of that position, say nr 8. That becomes question ID 8.
        return this.#getQuestion(this.#questionOrder[this.#currentIndex]);
    }

    checkScore(questions) {
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            if (question.wasCorrect) {
                this.#currentScore++;
            }
        }
        console.log(this.#currentScore)
        return this.#currentScore;  
    }

    /**
     *  Checks if the user is allowed to move to the next question.
        Returns true if the question was answered, or if the timer ran out.
        Returns false if the timer is still running and no answer was selected.
     * @param {Question} currentQuestion Gets the current question object
     * @returns 
     */
    checkIfAnswered(currentQuestion) {
        // if isExpired is false
        if(!currentQuestion.isExpired) {
            // if answered
            if (currentQuestion.isAnswered) {
                console.log("Was answered");
                return true;
            }
            else {
                console.log("Was not answered");
                return false;
            } 
        }
        else {
            //if Isexpired is true
            return true;
        }
    }

    /**
     * 
     * @returns {number} Return the length of questions array
     */
    length() {
       return this.#questions.length;
    }
    /**
     * 
     * @returns {number} The current position in the question order
     */
    get currentIndex() {
        return this.#currentIndex;
    }

    /**
     * 
     * @returns {number[]} The shuffled array of question IDs
     */
    get questionOrder() {
        return this.#questionOrder;
    }

    /**
     * 
     * @returns {number} The number of correct answers so far
     */
    get currentScore() {
        return this.#currentScore;
    }

    /**
     * 
     * @returns {Question} The question object at the current index
     */
    get currentQuestion() {
    return this.#getQuestion(this.#questionOrder[this.#currentIndex]);
    }

}

