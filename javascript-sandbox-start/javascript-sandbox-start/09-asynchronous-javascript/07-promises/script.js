const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        let error = true
        if (!error) {
            resolve('data is fetched')
        } else {
            reject('Error CAUSED')
        }
    }, 1000)
})

promise.then((data) => {
    console.log(data)
}).catch((err) => {
    console.log(err)
}).finally(() => {
    console.log("resolve or rejected")
})