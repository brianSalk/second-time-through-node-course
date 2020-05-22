
const wordForm = document.querySelector('form')
const input = document.querySelector('input')
const paragraphOne = document.querySelector('#message-1')
const paragraphTwo = document.querySelector('#message-2')

wordForm.addEventListener('submit', e => {

    fetch('http://localhost:3000/wordofday').then(response => {
    response.json().then(data => {
        if (data.error){
            return paragraphTwo.textContent = data.error
        }
        paragraphOne.textContent = `${data.word}: ${data.definition}`
    })
})
    e.preventDefault()
})  

// const wordForm = document.querySelector('form')
// const paragraphOne = document.querySelector('#message-1')
// const paragraphTwo = document.querySelector('#message-2')

// wordForm.addEventListener('submit', e => {

//     fetch('http://localhost:3000/wordofday').then(response => {
//     response.json().then(data => {
//         if (data.err) {
//             return paragraphTwo.textContent = data.error
//         }

//         paragraphOne.textContent = `${data.word}: ${data.definition}`
//         console.log(data.word)
//     })
// })
//     e.preventDefault()
// })  