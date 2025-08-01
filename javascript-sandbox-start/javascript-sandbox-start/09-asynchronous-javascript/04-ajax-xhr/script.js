const xhr = new XMLHttpRequest()


xhr.open('GET', './movies.json')

xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        console.log(JSON.parse(this.responseText))
    }
}

xhr.send()