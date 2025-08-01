const container = document.querySelector('#joke')

const button = document.querySelector('button')

function getJoke() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://api.chucknorris.io/jokes/random');

    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const response = JSON.parse(this.responseText)
            container.textContent = response.value
        }
    }

    xhr.send()
}


button.addEventListener('click', () => {
    getJoke()
})