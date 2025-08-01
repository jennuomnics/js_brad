const button = document.querySelector('button')
console.log(button)

const container = document.querySelector('#user')

const DisplayData = (data) => {
    console.log(data)

    container.innerHTML = `
    
     <div class="flex justify-between">
          <div class="flex">
            <img
              class="w-48 h-48 rounded-full mr-8"
              src=${data.picture.large} 
            />
            <div class="space-y-3">
              <p class="text-xl">
                <span class="font-bold">Name: </span>${data.name.title + data.name.first + data.name.last}
              </p>
              <p class="text-xl">
                <span class="font-bold">Email: </span>${data.email}
              </p>
              <p class="text-xl">
                <span class="font-bold">Phone: </span> ${data.phone}
              </p>
              <p class="text-xl">
                <span class="font-bold">Location: </span> ${data.location.city}
              </p>
              <p class="text-xl"><span class="font-bold">Age: </span> ${data.age}</p>
            </div>
          </div>
        </div>
    `
}

const changeUser = () => {
    fetch('https://randomuser.me/api/').then((response) => {
        console.log(response)
        return response.json()
    }).then((data) => {
        DisplayData(data.results[0])
    })
}


button.addEventListener('click', changeUser)