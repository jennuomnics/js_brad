const increment_1 = document.querySelector('.increment-1')
const increment_2 = document.querySelector('.increment-2')
const increment_3 = document.querySelector('.increment-3')


const container_1 = document.querySelector('.container-1')
const container_2 = document.querySelector('.container-2')
const container_3 = document.querySelector('.container-3')




const commonIncrement = (e, increment, container, fill) => {
    const value = increment.querySelector('div')
    console.log(container)
    if (e.target.tagName === 'BUTTON') {
        let number = Number(value.textContent)
        if (e.target.className.includes('inc')) {

            if (number === 100) {
                alert('Congraulations your the Winner')
                location.reload();
                return
            }
            number += 10

        } else {
            if (number === 0) {
                alert('Cannot decrease less than 0')
                return
            }
            number -= 10
        }
        container.style.background = `linear-gradient(to top, ${fill} 0%, ${fill} ${number}%, transparent ${number}%, transparent 100%)`;
        value.textContent = number
    }
}

increment_1.addEventListener('click', (e) => {
    commonIncrement(e, increment_1, container_1, 'red')
})
increment_2.addEventListener('click', (e) => {
    commonIncrement(e, increment_2, container_2, 'green')
})
increment_3.addEventListener('click', (e) => {
    commonIncrement(e, increment_3, container_3, 'blue')
})