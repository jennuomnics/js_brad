let laptopSpecs = []



const getData = async() => {
    const response = await fetch('./laptopSpecs.json')
    const data = await response.json()
    laptopSpecs = data;
    showInTable()
    AddingLaptopDetails()
}


getData()
console.log(laptopSpecs)

const showInTable = () => {
    const tbody = document.querySelector('tbody')
    laptopSpecs.sort((a, b) => a.specName.localeCompare(b.specName));


    laptopSpecs.forEach((item) => {

        const icon = '<i class="fa-solid fa-check" style="color: #14db22;"></i>'

        const maxScore = Math.max(item.lenova, item.dell, item.hp)

        const model1 = `${item.model1}${item.lenova === maxScore ? icon : ''}`
        const model2 = `${item.model2}${item.hp === maxScore ? icon : ''}`
        const model3 = `${item.model3}${item.dell === maxScore ? icon : ''}`

        const eachItem = `
    <tr>
        <th>${item.specName}</th>
        <td>${model1}</td>
        <td>${model2}</td>
        <td>${model3}</td>
    </tr>
   `
        tbody.innerHTML += eachItem;

    })
}



const laptop1 = document.querySelector('.laptop1')
const laptop2 = document.querySelector('.laptop2')
const compare_button = document.querySelector('.compare-button')
const best_one = document.querySelector('.best-one')
const laptop1_options = document.querySelectorAll('.laptop1 option')

const left_side = document.querySelector('.best-one .left-side img')
const right_side = document.querySelector('.best-one .right-side')




laptop1.addEventListener('change', (e) => {
    const filter_options = Array.from(laptop1_options).filter((each) => {
        return each.value !== e.target.value;
    })

    laptop2.innerHTML = ''
    laptop2.innerHTML += '<option>Choose 2st Laptop</option>'

    filter_options.forEach((item) => {
        if (item.value !== 'Choose 1st Laptop') {
            laptop2.innerHTML += `<option value=${item.value}>${item.textContent}</option>`
        }
    })


})

compare_button.addEventListener('click', (e) => {
    console.log(laptop1.value, laptop2.value)
    let l1 = 0
    let l2 = 0
    const v1 = laptop1.value;
    const v2 = laptop2.value;
    laptopSpecs.forEach((item) => {
        l1 += item[v1]
        l2 += item[v2]
    })
    let best_laptop = ''
    let best_lap = ''
    const values = { lenova: 'model1', hp: 'model2', dell: 'model3' }
    if (l1 > l2) {
        best_laptop = values[v1]
        best_lap = v1
    } else {
        best_laptop = values[v2]
        best_lap = v2
    }

    console.log(best_laptop, typeof(best_laptop))

    best_one.classList.remove('active')

    left_side.setAttribute('src', `./Images/${best_lap}.jpg`)
    left_side.setAttribute('alt', best_lap)

    right_side.innerHTML = ``
    right_side.innerHTML = `<h2>Recomended to Buy ${best_lap} </h2>`
    laptopSpecs.forEach((each) => {
        right_side.innerHTML +=
            ` <div class="align">
        <h3>${each.specName}</h3>
        <p>${each[best_laptop]}</p>
        </div>`
    })
})


// Adding laptop details
const lenova_laptop = document.querySelector('#lenova')
const hp_laptop = document.querySelector('#hp')
const dell_laptop = document.querySelector('#dell')

const AddingLaptopDetails = () => {

    console.log(laptopSpecs)

    const right_side_lenova = lenova_laptop.querySelector('.right-side')
    laptopSpecs.map((each) => {
        right_side_lenova.innerHTML += ` <div class="align">
        <h3>${each.specName}</h3>
        <p>${each.model1}</p>
        </div>`
    })


    const right_side_hp = hp_laptop.querySelector('.right-side')
    laptopSpecs.map((each) => {
        right_side_hp.innerHTML += ` <div class="align">
        <h3>${each.specName}</h3>
        <p>${each.model1}</p>
        </div>`
    })



    const right_side_dell = dell_laptop.querySelector('.right-side')
    laptopSpecs.map((each) => {
        right_side_dell.innerHTML += ` <div class="align">
        <h3>${each.specName}</h3>
        <p>${each.model1}</p>
        </div>`
    })



}



// Showing laptop details 

const lenova_show = document.querySelector('.lenova-show')
console.log(lenova_show)
const hp_show = document.querySelector('.hp-show')
const dell_show = document.querySelector('.dell-show')

lenova_show.addEventListener('click', (e) => {
    console.log(e, "line 316")
    lenova_laptop.classList.toggle('active')
    hp_laptop.classList.add('active')
    dell_laptop.classList.add('active')
})

hp_show.addEventListener('click', (e) => {
    console.log(e, "line 321")
    hp_laptop.classList.toggle('active')
    dell_laptop.classList.add('active')
    lenova_laptop.classList.add('active')
})

dell_show.addEventListener('click', (e) => {
    console.log(e, "line 321")
    dell_laptop.classList.toggle('active')
    hp_laptop.classList.add('active')
    lenova_laptop.classList.add('active')
})