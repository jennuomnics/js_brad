const getData = async() => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/')
    const data = await response.json()
    console.log(data)
    showDetailsTable(data)
}

getData()


const showDetailsTable = (data) => {
    const tbody = document.querySelector('tbody')
    data.forEach(element => {
        tbody.innerHTML += `
         <tr>
        <th>${element.id}</th>
        <td>${element.userId}</td>
        <td>${element.title}</td>
        <td>${element.completed}</td>
        <td> 
        <i class="fa-solid fa-trash" onclick ="{deleteCard(${element.id})}" style="color: #040c1b;"></i>
        <i class="fa-solid fa-pen-to-square" onclick ="{updateCard(${element.id},${element.userId})}" style="color: #030811;"></i> 
        </td>
    </tr>
        `
    });
}

const deleteCard = async(element) => {
    console.log(element)

    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${element}`, {
        method: 'DELETE'
    })

    console.log(response.status)
    const data = response.json()
    console.log(data)
    getData()

}


const updateCard = async(element, userid) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${element}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: element,
            userId: userid,
            title: 'surya',
            completed: false
        }),
        headers: {
            'content-type': 'application/json'
        }
    })

    const data = await response.json()
    console.log(response)
    console.log("updated Data", data)
}


// form for post 

const Addingform = document.querySelector('.form-container')

Addingform.addEventListener('submit', async(e) => {
    e.preventDefault()
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/`, {
        method: 'POST',
        body: JSON.stringify({
            userId: Addingform.userId.value,
            title: Addingform.title.value,
            completed: Addingform.status.value
        })
    })

    const data = await response.json()
    console.log(response, data)
    Addingform.reset()
})