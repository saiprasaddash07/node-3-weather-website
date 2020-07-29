//we are going to fetch a json string and then return sth
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageone = document.querySelector('#message-1');
const messagetwo = document.querySelector('#message-2');
//messageone.textContent = 'From js'

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();

    const location = search.value;
    messageone.textContent = 'Loading weather data';
    messagetwo.textContent = '' ;

    //fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                return messageone.textContent = data.error ;
            }else{
                messageone.textContent = data.location;
                messagetwo.textContent = data.forecast;
            }
        })
    });
})







