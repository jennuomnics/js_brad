import { v4 as uuid } from 'https://cdn.skypack.dev/uuid';

let track = {
    DailyCalorieLimit: 0,
    Gan: 0,
    CaloriesConsumed: 0,
    CaloriesBurned: 0,
    CaloriesRemaining: 0
}



const limit_form = document.getElementById('limit-form')
const calories_limit = document.getElementById('calories-limit')
const calories_total = document.getElementById('calories-total')
const calories_consumed = document.getElementById('calories-consumed')
const calories_burned = document.getElementById('calories-burned')
const calories_remaining = document.getElementById('calories-remaining')


const filter_meals = document.getElementById('filter-meals')

const meal_form = document.getElementById('meal-form')

const workout_form = document.getElementById('workout-form')
const filter_workouts = document.getElementById('filter-workouts')

const reset = document.getElementById('reset')


const calorieProgress = document.getElementById('calorie-progress')

reset.addEventListener('click', (e) => {
    localStorage.removeItem('track')
    localStorage.removeItem('Meals')
    localStorage.removeItem('Workouts')
    calorieProgress.style.backgroundColor = 'transparent'
    calorieProgress.style.width = `100%`
    calories_remaining.parentElement.classList.remove('over')
    location.reload();

})





const UpdateTrackUi = () => {
    calories_limit.textContent = track.DailyCalorieLimit
    calories_total.textContent = track.Gan
    calories_consumed.textContent = track.CaloriesConsumed
    calories_burned.textContent = track.CaloriesBurned
    calories_remaining.textContent = track.CaloriesRemaining
    const width = (track.CaloriesConsumed / track.DailyCalorieLimit) * 100
    if (width <= 100) {
        calorieProgress.style.backgroundColor = 'green'
        calorieProgress.style.width = `${width}%`
        calories_remaining.parentElement.classList.remove('over')
    } else if (track.DailyCalorieLimit !== 0) {
        calories_remaining.parentElement.classList.add('over')
        calorieProgress.style.backgroundColor = 'orange'
        calorieProgress.style.width = `100%`
    }
}

const UpdateTrack = () => {
    localStorage.setItem('track', JSON.stringify(track))
}

limit_form.addEventListener('submit', (e) => {
    // e.preventDefault()
    const limit = limit_form.limit.value
    if (limit === '') {
        alert('Enter limit')
        return
    }
    track = {
        DailyCalorieLimit: Number(limit.trim()),
        Gan: 0,
        CaloriesConsumed: 0,
        CaloriesBurned: 0,
        CaloriesRemaining: 0
    }
    calories_limit.textContent = limit.trim()
    localStorage.removeItem('track')
    localStorage.removeItem('Meals')
    localStorage.removeItem('Workouts')
    UpdateTrack()
    UpdateTrackUi()
})

if (!localStorage.getItem('track')) {

    UpdateTrack()
    UpdateTrackUi()
}

if (localStorage.getItem('track')) {
    const local_values = JSON.parse(localStorage.getItem('track'))
    track = local_values
    UpdateTrackUi()
}



// Meals 
let Meals = []



if (localStorage.getItem('Meals')) {

    Meals = JSON.parse(localStorage.getItem('Meals'))
}


document.querySelector('#meal-items').addEventListener('click', (e) => {
    if (e.target.tagName === 'I') {
        const mealItem = e.target.closest('.card');
        if (mealItem) {
            const deleteId = mealItem.dataset.id

            const find_value = Meals.find((each) => {
                return each.id === deleteId;
            })


            Meals = Meals.filter((each) => {
                return each.id !== deleteId;
            })

            const MealValue = Number(find_value.calories)

            track.Gan -= MealValue
            track.CaloriesConsumed -= MealValue
            track.CaloriesRemaining = track.DailyCalorieLimit - track.CaloriesConsumed
            console.log(track)
            UpdateTrack()
            UpdateTrackUi()


            localStorage.setItem('Meals', JSON.stringify(Meals))
            mealItem.remove()
            DisplayMealItemsUi(Meals)
        }
    }
})


filter_meals.addEventListener('input', (e) => {
    if (e.target.value === '') {
        DisplayMealItemsUi(Meals)
    } else {
        const value = e.target.value.trim()
        const filterItems = Meals.filter((each) => {
            if (each.name.includes(value)) {
                return each
            }
        })
        DisplayMealItemsUi(filterItems)
    }
})


const DisplayMealItemsUi = (Meals) => {
    document.querySelector('#meal-items').innerHTML = ``
    Meals.map((item) => {
        const div = document.createElement('div')
        div.className = 'card my-2'
        div.setAttribute('data-id', item.id)
        div.innerHTML = `
    <div class="card-body">
    <div class="d-flex align-items-center justify-content-between">
        <h4 class="mx-1">${item.name}</h4>
        <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
            ${item.calories}
        </div>
        <button class="delete btn btn-danger btn-sm mx-2">
    <i class="fa-solid fa-xmark"></i>
    </button>
            </div>
        </div>

        `
        document.querySelector('#meal-items').appendChild(div)
    })
}

DisplayMealItemsUi(Meals)

meal_form.addEventListener('submit', (e) => {
    // e.preventDefault()
    const meal_name = document.getElementById('meal-name')
    const meal_calories = document.getElementById('meal-calories')
    if (meal_name.value === '' || meal_calories.value <= 0) {
        alert("Enter proper values of meals")
        return
    }
    const newMeal = {
        id: uuid(),
        name: meal_name.value.trim(),
        calories: meal_calories.value
    }
    const MealValue = Number(meal_calories.value)
    track.Gan += MealValue
    track.CaloriesConsumed += MealValue
    track.CaloriesRemaining = track.DailyCalorieLimit - track.CaloriesConsumed
    console.log(track)
    UpdateTrack()
    UpdateTrackUi()
    meal_form.reset()
    Meals.push(newMeal)
    localStorage.setItem('Meals', JSON.stringify(Meals))
    DisplayMealItemsUi(Meals)
})

// Meals



let Workouts = []



if (localStorage.getItem('Workouts')) {
    Workouts = JSON.parse(localStorage.getItem('Workouts'))
}


document.querySelector('#workout-items').addEventListener('click', (e) => {
    if (e.target.tagName === 'I') {
        const workoutItem = e.target.closest('.card');
        if (workoutItem) {
            const deleteId = workoutItem.dataset.id

            const find_value = Workouts.find((each) => {
                return each.id === deleteId;
            })


            Workouts = Workouts.filter((each) => {
                return each.id !== deleteId;
            })
            const MealValue = Number(find_value.calories)
            track.Gan += MealValue
            track.CaloriesConsumed += MealValue
            track.CaloriesBurned -= MealValue
            track.CaloriesRemaining = track.DailyCalorieLimit - track.CaloriesConsumed
            console.log(track)
            UpdateTrack()
            UpdateTrackUi()
            localStorage.setItem('Workouts', JSON.stringify(Workouts))
            workoutItem.remove()
            DisplayworkoutItemsUi(Workouts)
        }
    }
})


filter_workouts.addEventListener('input', (e) => {
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
    // e.preventDefault()
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

    const MealValue = Number(workout_calories.value)
    track.Gan -= MealValue
    track.CaloriesConsumed -= MealValue
    track.CaloriesBurned += MealValue
    track.CaloriesRemaining = track.DailyCalorieLimit - track.CaloriesConsumed
    console.log(track)
    UpdateTrack()
    UpdateTrackUi()
    workout_form.reset()
    Workouts.push(newworkout)
    localStorage.setItem('Workouts', JSON.stringify(Workouts))
    DisplayworkoutItemsUi(Workouts)
})

// Workouts