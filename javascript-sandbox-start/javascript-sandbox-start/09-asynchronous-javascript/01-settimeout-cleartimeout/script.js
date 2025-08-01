 const h1 = document.querySelector('h1')
 const button = document.querySelector('#cancel')


 console.log(h1)

 const set = setTimeout(() => {
     console.log('hi')
     h1.textContent = 'Hello World'
 }, 3000)


 button.addEventListener('click', (e) => {
     clearTimeout(set)
 })