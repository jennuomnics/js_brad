let todos_data = []

const getData = async() => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/')
    const data = await response.json()
    console.log(data)
    todos_data = data.slice(0, 10)
    showDetailsTable(todos_data)
}

getData()


const showDetailsTable = (data) => {
    const tbody = document.querySelector('tbody')
    tbody.innerHTML = ''
    data.forEach(element => {
        tbody.innerHTML += `
         <tr data-id=${element.id}>
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


// Deleting DATA FROM Table

const deleteCard = async(element) => {
    todos_data = todos_data.filter((each) => {
        return each.id !== element;
    })

    console.log(todos_data)

    showDetailsTable(todos_data)

}


// Updating In the Table

const updateCard = async(id, userid) => {
    const row = document.querySelector(`tr[data-id='${id}']`)
    const todo = todos_data.find((each) => {
        return each.id === id;
    })
    console.log(todo)
    if (!todo || !todo) {
        return
    }
    row.innerHTML = `
    <td>${todo.id} </td>
    <td>
    <input type="number" class="edit-userId" value='${todo.userId}' />
           
    </td>
    <td>
    <input type="text" class="edit-title" value='${todo.title}' />
           
    </td>
          <td>
            <select class="edit-status">
                <option value="true" ${todo.completed ? 'selected' : ''}>True</option>
                <option value="false" ${!todo.completed ? 'selected' : ''}>False</option>
            </select>
        </td>
     <td>
        <button onclick="{SaveUpdate(${todo.id})}">Save </button>
        <button onclick="{CancelUpdate()}">Cancel </button>
     </td>
    `
}

const SaveUpdate = (id) => {
    const row = document.querySelector(`tr[data-id='${id}']`)
    const userId = row.querySelector('.edit-userId').value.trim()
    const title = row.querySelector('.edit-title').value.trim()
    const status = row.querySelector('.edit-status').value

    if (userId === '' || Number(userId) <= 0 || title === '') {
        alert("Enter Valid Details")
        return;
    }

    todos_data = todos_data.map((todo) => {
        if (todo.id === id) {
            return {
                ...todo,
                userId: Number(userId),
                title: title,
                completed: status === 'true'
            }
        }
        return todo;
    })
    showDetailsTable(todos_data)

}

const CancelUpdate = () => {
    showDetailsTable(todos_data)
}


// form for post 

const Addingform = document.querySelector('.form-container')

Addingform.addEventListener('submit', async(e) => {
    e.preventDefault()
    console.log(document.getElementById("userIdError"))
    document.getElementById("userIdError").textContent = '';
    document.getElementById("titleError").textContent = '';
    document.getElementById("statusError").textContent = '';

    const userId = Addingform.userId.value.trim();
    const title = Addingform.title.value.trim();
    const status = Addingform.status.value;

    let hasError = false;

    if (userId === '' || isNaN(userId) || Number(userId) <= 0) {
        document.getElementById("userIdError").textContent = "Please enter a valid positive number for User ID.";
        hasError = true;
    }

    if (title === '') {
        document.getElementById("titleError").textContent = "Title is required.";
        hasError = true;
    }

    if (!status) {
        document.getElementById("statusError").textContent = "Please select a status.";
        hasError = true;
    }

    if (hasError) return;

    todos_data.push({
        id: Math.ceil(Math.random() * 1000),
        userId: Number(Addingform.userId.value.trim()),
        title: Addingform.title.value.trim(),
        completed: Addingform.status.value === 'true'
    })

    Addingform.reset()

    showDetailsTable(todos_data)

})


// Search Functionality 

const search = document.querySelector('#search')

search.addEventListener('input', (e) => {
    if (e.target.value === '') {
        showDetailsTable(todos_data)
    } else {
        const value = e.target.value;
        const filter_data = todos_data.filter((each) => {
            return each.title.includes(value)
        })
        showDetailsTable(filter_data)
    }
})