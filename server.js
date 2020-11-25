// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser');
const { json } = require('body-parser');
// Start up an instance of app
const app=express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port=8000
const server=app.listen(port,function(){
    console.log('server running successfully')
})



app.get('/getdata',function(req,res){

 
res.send(JSON.stringify(projectData) )
})

app.post('/postdata',function(req,res){
    
let postdata= req.body

projectData.date=postdata.date
projectData.temp=postdata.temp
projectData.feel=postdata.feel

res.send('POST received')

})