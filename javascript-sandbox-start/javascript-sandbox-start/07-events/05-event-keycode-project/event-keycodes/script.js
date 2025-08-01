const body = document.querySelector('body')
const insert = document.querySelector('#insert')

console.log(insert, insert.firstElementChild, insert.lastElementChild)


body.addEventListener('keydown', (e) => {
    e.preventDefault()
    insert.firstElementChild.textContent = e.key
    insert.children[1].textContent = e.keyCode
    insert.lastElementChild.textContent = e.code
})