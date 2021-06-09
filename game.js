const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Jemand kommt zu Besuch. Du machst _____ auf.",
        choice1: "den Fußboden",
        choice2: 'die Wand',
        choice3: 'die Tafel',
        choice4: 'die Tür',
        answer: 4,
    },
    {
        question: "Du hörst Musik. Du benutzt _____.",
        choice1: "den iPod",
        choice2: "die Blume",
        choice3: "die Tafel",
        choice4: "die Uhr",
        answer: 1,
    },
    {
        question: "Du wäschst dir die Hände. Du benutzt _____.",
        choice1: "den Feiertag",
        choice2: "das Waschbecken",
        choice3: "die Kunst",
        choice4: "den Balkon",
        answer: 2,
    },
    {
        question: "Du stehst früh auf und bist noch total müde. Du brauchst _____.",
        choice1: "den Wind",
        choice2: "den Morgen",
        choice3: "den Kaffee",
        choice4: "den Kuli",
        answer: 3,
    },
    {
        question: "Du gehst fünf Tage mit Freunden wandern. Du nimmst _____ mit.",
        choice1: "die Küche",
        choice2: "den Schrank",
        choice3: "den Schnee",
        choice4: "den Rucksack",
        answer: 4,
    },
    {
        question: "Du besuchst einen Freund in seiner neuen Wohnung. Du brauchst _____.",
        choice1: "den Platz",
        choice2: "das Bad",
        choice3: "die Katze",
        choice4: "die Adresse",
        answer: 4,
    },
    {
        question: "Du schreibst eine Einkaufsliste. Du brauchst _____.",
        choice1: "den Regen",
        choice2: "den Stift",
        choice3: "die CD",
        choice4: "das Heft",
        answer: 2,  
    },
    {
        question: "Du fragst dich, wie spät es ist. Du brauchst _____.",
        choice1: "das Kind",
        choice2: "den Monat",
        choice3: "die Psychologie",
        choice4: "die Uhr",
        answer: 4,
    },
    {
        question: "Du musst morgen um 5.00 aufstehen. Du benutzt _____.",
        choice1: "den Schrank",
        choice2: "das Haus",
        choice3: "das Fenster",
        choice4: "den Wecker",
        answer: 4,
    },
    {
        question: "Es ist 20.00 Uhr und wird dunkel. Du brauchst _____.",
        choice1: "die Lampe",
        choice2: "den Teppich",
        choice3: "die Arbeit",
        choice4: "das Geld ",
        answer: 1,
    },
    {
        question: "Das_____.",
        choice1: "Haus, Auto, Katze, Hund",
        choice2: "Auto, Tisch, Buch, Haus",
        choice3: "Kind, Handy, Glas, Regal",
        choice4: "Buch, Auto, Haus, Computer",
        answer: 3,
    },
    {
        question: "Der_____.",
        choice1: "Computer, Hund, Baum, Kind",
        choice2: "Sonne, Foto, Garten, Flasce",
        choice3: "Garten, Handy, Computer, Regal",
        choice4: "Garten, Computer, Hund, Baum ",
        answer: 4,
    },
    {
        question: "Die_____.",
        choice1: "Katze, Lampe, Tasse, Flasce",
        choice2: "Regen, Katze, Tochter, Mutter",
        choice3: "Klasse, Tante, Vase, Raum ",
        choice4: "Teller, Kugelscreiber, Sessel, Tisch",
        answer: 1,
    },
    {
        question: "_____: Enkelin, Individualität, Industrie.",
        choice1: "Das",
        choice2: "Der",
        choice3: "Die",
        choice4: "Den",
        answer: 3,
    },
    {
        question: "_____: Willen, Schmetterling, Platz. ",
        choice1: "Das",
        choice2: "Der",
        choice3: "Die",
        choice4: "Den",
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 15

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
