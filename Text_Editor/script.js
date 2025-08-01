import Stack from './stack.js'
const stack = new Stack()
console.log(stack)


const editorContainer = document.querySelector('.editor')
const filters = document.querySelector('.filters')
const editor = document.querySelector('#edit-text')

const color = document.querySelector('#color')

const font_family = document.querySelector('#font-family')
const font_size = document.querySelector('#font-size')


const undo = document.getElementById('undo')
const redu = document.getElementById('redu')

const addTo = () => {
    const state = {
        color: editor.style.color,
        fontFamily: editor.style.fontFamily,
        fontSize: editor.style.fontSize
    }
    stack.AddChange(state)
}

color.addEventListener('input', (e) => {
    if (editor.value !== '') {
        editor.style.color = e.target.value
        addTo()
    }
})

font_size.addEventListener('change', (e) => {
    // console.log(e.target.value, typeof(e.target.value))
    if (editor.value === '') {
        alert('Enter Text and Change')
        return
    }
    if (Number(e.target.value) > 0) {
        editor.style.fontSize = `${Number(e.target.value)}px`
        addTo()
    }
})


font_family.addEventListener('change', (e) => {
    // console.log(e.target.value, typeof(e.target.value))
    if (editor.value === '') {
        alert('Enter Text and Change')
        return
    }
    editor.style.fontFamily = e.target.value
    addTo()

})

undo.addEventListener('click', (e) => {
    const item = stack.Undo()
    console.log(item)
    if (item !== null) {
        editor.style.color = item.color
        editor.style.fontFamily = item.fontFamily
        editor.style.fontSize = item.fontSize
    }
    console.log(editor)
})

redu.addEventListener('click', (e) => {
    const item = stack.Redu()
    console.log(item)
    if (item !== null) {
        editor.style.color = item.color
        editor.style.fontFamily = item.fontFamily
        editor.style.fontSize = item.fontSize
    }
})