const path = require('path');
const express = require('express');
const hbs = require('hbs'); //we use it to create templates bcoz we dont add diff footers and headers for diff pages so copy pasting is a bad idea
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// //console.log(__filename);
// console.log(path.join(__dirname,'../public'));

const app = express();

const port = process.env.PORT || 3000; //to use it on heroku we use port and to use it locally we use 3000


/*
  here handle bar just think that we should use the views file named "VIEWS"
  if we change the views filename to anything lets say templates then our program will crash
  to avoid such an error
  we have to speciffically provide the path name
  we have to use this syntax app.set('prev name{views here}','the name that we newly set')
*/

// DEFINE PATHS FOR EXPRESS CONFIG

const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

/*
    we just want dynamic web pages 
    if we do not install hbs then we will have to copy paste every single item like header from one html file to other
*/

//SET UP HANDLEBARS ENGINE AND VIEWS LOCATION

app.set('view engine','hbs'); //to setup the handlebar
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

// SET UP STATIC DIRECTORY TO SERVE

app.use(express.static(path.join(publicDirectoryPath)));

/*
    app.com -----------------> root route
    app.com/help
    app.com/about
    all this are gonna run on a single web server
*/

/*
    .get function is used when someone visits the given url in 1st argument
    the second argument describes what to do when someone visits our given url
    req is short term of request which is used to handle incoming request from the server
    res is response which is used to what we gonna send to when someone requests something
*/

// app.get('',(req,res)=>{
//     res.send('<h1>Weather</h1>');
// })

// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'XYZW'
//     },{
//         name:'ABCD'
//     }]);
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>');
// })

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Sai Prasad Dash'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Sai Prasad Dash'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'About help',
        name:'Sai Prasad Dash',
        helpText:'This is some helpful text'
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a valid address'
        })
    }
    geocode(req.query.address,(error,{lattitude,longitude,location} = {})=>{ 
        if(error){
            return res.send({
                error:'Provide an address to access data'
            });
        }
        forecast(lattitude,longitude,(error,forecastdata)=>{ 
            if(error){
                return res.send({
                    error:'Some error occured here'
                });
            }
            res.send({
                forecast:forecastdata,
                location:location,
                address:req.query.address
            });
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    // console.log(req.query); //req.query contains all the query strings so when we add some query strings in the browser and refresh it will shown in command line
    console.log(req.query.search);
    res.send({
        products:[]
    });
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sai Prasad Dash',
        errorMessage:'Help article not found'
    })
})

//SETTING UP 404 PAGE IF THAT PAGE DOESNT EXIST

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sai Prasad Dash',
        errorMessage:'Page not found'
    })
})

// app.listen(3000,()=>{
//     console.log('Server is up on port 3000');
// })

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
})