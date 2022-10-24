const { response } = require('express');
let express = require('express');
let app = express();
//Body-Parser Replacement
app.use(express.json());


//DB INITIAL CODE: 
//DataBase Storage added
let Datastore = require('nedb');
//create new Data Store
let db = new Datastore('drawings.db');
db.loadDatabase();

let newDrawings = [];


let characters = {
    "data" : [
        {
            name: "Finn",  
            desc: "Finn the Fish follows a fish that loves to cook!"
        },
        {
            name: "Hawkey",
            desc: "A young Hawk gets lost from the pack. With the help of a little songbird, will he be able to find his way back home?"
        },
        {
            name: "Egypt",
            desc: "Kiya navigates the unknown in search of the key that holds the fate of all Egypt."
        }
    ]
}

//LEARNING SOMETHING NEW: Date 10/22/2022
//2. Go to the server (index.js) and add a ROUTE that is listening for a POST REQUEST!
app.post('/numReq', (request, response)=> {
    console.log(request.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        drawings: request.body.number
    }

//INSERT NEW DRAWING REQUESTS INTO DATABASE: 
    db.insert(obj,(err, newDocs)=>{
        console.log('new document inserted');
        if(err){
           response.json({task: "try again"})
        } else {
            response.json({task:"success"});
        }
    })
    // newDrawings.push(obj);
    // console.log(newDrawings);
    // response.json({task:"success"});
})

app.use('/',express.static('public'));

//Let's make a second route!
app.get('/about', (request, response)=>{
      response.send("this is an about page!");
})

//Define for the array made: This array was displayed on my website/server! :) 
app.get('/characters', (request, response)=>{
    response.json(characters);
}) 


//Params: Selecting each individual character! This was correctly displayed in my terminal! YAY :) 
app.get('/characters/:character', (request, response)=>{
    console.log(request.params.character);
    let user_character = request.params.character;
    let user_object;
   
    //Now using for loop and if statement
    for(let i=0; i<characters.data.length;i++) {
        if(user_character == characters.data[i].name) {
            user_object = characters.data[i];
        }
    }
    console.log(user_object);
    //let's the user know if the information is NOT HERE :(
    if(user_object) {
        response.json(user_object);
    } else {
        response.json({status:"information not here! :("});
    }
    response.send("thank you so much!!!");
   
})

//Telling Server where to listen:
app.listen(3000, ()=> {
    console.log('app is listening at localhost:3000');
})

//ADD ROUTE TO GET ALL DRAWING REQUESTS INFORMATION!
app.get('/getDrawings', (request, response)=> {
    db.find({}, (err, docs)=> {
        if(err){
            response.json({task: "try again"})
         } else {
            let obj = {data:docs};
            response.json(obj);
         }
        // console.log(docs);
   
    })
   
})
