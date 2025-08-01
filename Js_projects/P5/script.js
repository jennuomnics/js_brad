const Questions = [{
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: "Mars"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["William Wordsworth", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correct: "William Shakespeare"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        correct: "Pacific Ocean"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Oxygen", "Gold", "Osmium", "Iron"],
        correct: "Oxygen"
    },
    {
        question: "In which year did World War II end?",
        options: ["1940", "1942", "1945", "1950"],
        correct: "1945"
    },
    {
        question: "Which language is primarily used for web development?",
        options: ["Python", "C++", "HTML", "Java"],
        correct: "HTML"
    },
    {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        correct: "2"
    },
    {
        question: "Which continent is known as the 'Dark Continent'?",
        options: ["Asia", "Africa", "South America", "Europe"],
        correct: "Africa"
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correct: "Carbon Dioxide"
    }
];

const total_questions = Questions.length

let index = 0

let Score = 0

const id_values = ['a', 'b', 'c', 'd']

const content = document.querySelector('.content')

const Store_Answers = []

const DisplayValues = (index, checkvalue) => {
    content.innerHTML = ''
    content.innerHTML = `
      <h2>Q${index+1} ${Questions[index].question}</h2>
`
    Questions[index].options.map((each, id) => {
        content.innerHTML += `
     <div class="radio-container">
        <input type="radio" name="question" value='${each}' ${each === checkvalue ?'checked':''} id=${id_values[id]} />
        <label for=${id_values[id]}>${each}</label>
    </div>
    `
    })

}


DisplayValues(index, '')


// Carsoul 

const right_button = document.querySelector('.right-side')
const left_button = document.querySelector('.left-button')


left_button.addEventListener('click', (e) => {
    if (index <= 0) {
        alert('this is the First Question')
        return
    }

    index -= 1



    DisplayValues(index, Store_Answers[index])
})

right_button.addEventListener('click', (e) => {
    if (index === total_questions) {
        alert('Your Quiz is done')
        return
    }

    const input_value = content.querySelector('input[name="question"]:checked');
    if (input_value === null) {
        alert('please Select one of the Option')
        return
    }
    if (Store_Answers.length >= index) {
        Store_Answers[index] = input_value.value
    } else {
        Store_Answers.push(input_value.value)
    }

    console.log(index, 'index')
    if (index >= total_questions - 1) {
        if (index === total_questions - 1) {
            index = total_questions
        }
        Score = 0
        Questions.map((each, i) => {
            console.log(i)
            if (each.correct === Store_Answers[i]) {
                Score += 10;
            }
        })
        content.innerHTML = `
         <h2>Quiz Completed ? </h2>
         <h1>${Score} </h1>
        `
        return
    }


    console.log(Store_Answers)
    index += 1
    if (Store_Answers.length >= index) {
        DisplayValues(index, Store_Answers[index])
    } else {
        DisplayValues(index, '')
    }

})