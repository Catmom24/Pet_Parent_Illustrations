// console.log("hello from app.js");

// const { response } = require("express");


//Create Event Listener for requests! :)
window.addEventListener('load',()=> {
    document.getElementById('request-button').addEventListener('click', ()=>{
        let numReq = document.getElementById('new-request').value;
        console.log(numReq);

        //creating the object
        let obj = {"number" : numReq};

        //stringify the object
        let jsonData = JSON.stringify(obj);
       
         //1. Make a Fetch() request of Type Post so I can send information (numReq) to the server!
        //fetch to the route 
        fetch("/numReq", {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
             body: jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)});

         
          //2. Go to the server (index.js) and add a ROUTE that is listening for a POST REQUEST!
          
    })

    //ADD NEW EVENT LISTENER!
   document.getElementById('get-requests').addEventListener('click', ()=> {
    //get information on all new drawing requests so far! 

    //TIME TO USE INFORMATION! FETCH FUNCTION
    fetch('/getDrawings')
    .then(response => response.json())
    .then(data => {
        document.getElementById('drawings-info').innerHTML = '';
        console.log(data.data);
        for(let i=0; i<data.data.length; i++) {
            let string = data.data[i].date + " : " + data.data[i].drawings;
            let element = document.createElement('p');innerHTML = string; 
            document.getElementById('drawings-info').appendChild(element);
        }
    })
   })
})




