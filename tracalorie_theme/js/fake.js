// Workouts 
let Workouts = []

console.log(Workouts)

if (localStorage.getItem('Workouts')) {
    console.log(19)
    Workouts = JSON.parse(localStorage.getItem('Workouts'))
}


document.querySelector('#workout-items').addEventListener('click', (e) => {
    if (e.target.tagName === 'I') {
        const workoutItem = e.target.closest('.card');
        if (workoutItem) {
            const deleteId = workoutItem.dataset.id
            Workouts = Workouts.filter((each) => {
                return each.id !== deleteId;
            })
            localStorage.setItem('Workouts', JSON.stringify(Workouts))
            workoutItem.remove()
            DisplayworkoutItemsUi(Workouts)
        }
    }
})


filter_Workouts.addEventListener('input', (e) => {
    if (e.target.value === '') {
        DisplayworkoutItemsUi(Workouts)
    } else {
        const value = e.target.value.trim()
        const filterItems = Workouts.filter((each) => {
            if (each.name.includes(value)) {
                return each
            }
        })
        DisplayworkoutItemsUi(filterItems)
    }
})


const DisplayworkoutItemsUi = (Workouts) => {
    document.querySelector('#workout-items').innerHTML = ``
    Workouts.map((item) => {
        const div = document.createElement('div')
        div.className = 'card my-2'
        div.setAttribute('data-id', item.id)
        div.innerHTML = `
       <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
            <h4 class="mx-1">${item.name}</h4>
            <div class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5">
               ${item.calories}
            </div>
            <button class="delete btn btn-danger btn-sm mx-2">
        <i class="fa-solid fa-xmark"></i>
        </button>
                </div>
            </div>

        `
        document.querySelector('#workout-items').appendChild(div)
    })
}

DisplayworkoutItemsUi(Workouts)

workout_form.addEventListener('submit', (e) => {
    e.preventDefault()
    const workout_name = document.getElementById('workout-name')
    const workout_calories = document.getElementById('workout-calories')
    if (workout_name.value === '' || workout_calories.value <= 0) {
        alert("Enter proper values of Workouts")
        return
    }
    const newworkout = {
        id: uuid(),
        name: workout_name.value.trim(),
        calories: workout_calories.value
    }
    workout_form.reset()
    console.log(Workouts)
    Workouts.push(newworkout)
    localStorage.setItem('Workouts', JSON.stringify(Workouts))
    DisplayworkoutItemsUi(Workouts)
})

// Workouts