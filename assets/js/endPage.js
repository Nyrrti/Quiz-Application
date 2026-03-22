// const questions = [
//   {"id": 1, "title":"Who was the leader of SG-1 for the first years?", "answers":["General Hammond", "Jack O'Neill", "Sam Carter", "Cameron Mitchell","Teal'c"], "correctAnswer": "Jack O'Neill", "answerTrivia": "Jack O'Neill was the leader of SG-1 until season 8, when he became a General and became the commanding officer of the SGC."},
//   {"id": 2, "title":"Who replaced Daniel Jackson in season 6?",	"answers":["Gerak", "Jacob Carter", "Hank Landry", "Jonas Quinn", "Master Bra'tac"], "correctAnswer": "Jonas Quinn", "answerTrivia": "Jonas Quinn was the 'replacement' for Jackson after he died of radiation poisoning."},
//   {"id": 3, "title":"The Stargate can always be held open indefinitely.", "answers":["True", "False"], "correctAnswer": "False", "answerTrivia": "The Stargate can be held open for 38 minutes before it shuts itself down unless it is held open by an extremely powerful source (blackhole, etc)."},
//   {"id": 4, "title":"How many symbols need to be 'dialed' to connect to a planet?",	"answers":["5","6","7","8"], "correctAnswer": "7", "answerTrivia": "They must 'dial' 6 symbols, and then the origin symbol."},
//   {"id": 5, "title":"How do you say 'Stargate' in Goa'uld?",	"answers":["Chappa'ai", "Portal","Ring of the Gods","Circle of Standing Water"], "correctAnswer": "Chappa'ai", "answerTrivia": "In the Goa'uld language the Stargate is referred to as the Chappa'ai (Cha-Pa-Eye)."},
//   {"id": 6, "title":"Who are Earth's main enemies for the first part of the show?",	"answers":["Ori", "Tokra","Goa'uld","Replicators","Asgard"], "correctAnswer": "Goa'uld", "answerTrivia": "The Goa'uld were the first universal enemies of Earth. The Replicators and the Ori are also enemies, but they come later."},
//   {"id": 7, "title":"What is the first planet Jack O'Neill goes to through the Stargate?",	"answers":["Abydos", "Hoth","Venus","P3X-5156","P3X-6473"], "correctAnswer": "Abydos", "answerTrivia": "In the movie, and then again in the season premier, they only go to Abydos."},
//   {"id": 8, "title":"What planet is Teal'c from?",	"answers":["Abydos", "Chulak","Mars","Atlantis"], "correctAnswer": "Chulak", "answerTrivia": "Teal'c has referred many times throughout the show that his home world is Chulak. There he trained to be the perfect soldier and became First Prime of Apophis."},
//   {"id": 9, "title":"This Asgard scientist was responsible for many of the alien abductions on Earth, including Col. O'Neill.",	"answers":["Penegal", "Heimdall","Loki","Freyr"], "correctAnswer": "Loki", "answerTrivia": "Loki, named after the Norse god of mischeif, conducted genetic research on humans in an attempt to discover a way to incorporate the human genetic structure into the Asgard clone bodies to overcome the degredation that has occurred over many generations of clones. Loki's activities were discovered when the O'Neill clone sent to Earth, while the real O'Neill was being tested, failed to fully mature. "},
//   {"id": 10, "title":"What is the name of the archaeologist that traps two members of SG1 in a 10 hour time loop?",	"answers":["Martouf", "Malikai","Ma'chello","Malchus"], "correctAnswer": "Malikai", "answerTrivia": "Attempting to use an abandoned device created by the Ancients to return to a time where his wife was still alive, Malikai traps himself, Teal'c and O'Neill in a time loop. They discover that the Ancients were unable to make the device work and are finally able to convince Malikai to give up."},
// ]
const questions =  JSON.parse(sessionStorage.getItem("data"));
// create one quiz instance
const quiz = new Quiz(); 
const renderQuiz = new RenderQuiz();
// change the json to objects so I work with it
quiz.loadData(questions);


// renderQuiz.displayEndResult(quiz.orderedQuestion());
// console.log(quiz.orderedQuestion());

const resultButton = document.getElementById("checkEndResult");
resultButton.addEventListener("click", function() {
    quiz.checkScore(quiz.getOrderedQuestions());
    renderQuiz.displayScore(quiz.currentScore , quiz.length())
    renderQuiz.displayEndResult(quiz.getOrderedQuestions());
    resultButton.classList.add("hidden");
    
});



