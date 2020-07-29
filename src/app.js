const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

//SET UP HANDLEBARS ENGINE AND VIEWS LOCATION

app.set('view engine','hbs');
app.set('views',viewsPath);

hbs.registerPartials(partialPath);

app.use(express.static(path.join(publicDirectoryPath))); //we are using only static pages here

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