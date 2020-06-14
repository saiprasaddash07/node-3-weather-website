const request = require('request');

//const url1 = 'http://api.weatherstack.com/current?access_key=a2e1827d481cec1850921c3da3dfd3bd&query=37.8267,-122.4233&units=f' ;

//to change some property like temperature we will add another query in url and we can find it in api documentation

// request({ url : urls } , (error,response)=>{
//     //console.log(response) ;
//     const data = JSON.parse(response.body);
//     console.log(data.current) ;
// })

//if we add json to true the JSON string is automatically parsed

// request({ url : url1 , json:true} , (error,response)=>{
//     //console.log(response.body.current) ;
//     if(error){
//         console.log('Unable to connect to weather service!') //low level os error
//     }else if(response.body.error){
//         console.log('Unable to find location') ;
//     }else{
//         console.log(`${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} .It feels like ${response.body.current.feelslike} degrees out.` ) ;
//     }
// })

const forecast = (latitude,longitude,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=a2e1827d481cec1850921c3da3dfd3bd&query=${latitude},${longitude}&units=f` ;
    request({ url , json:true} , (error,{body}={})=>{
    if(error){
        callback('Unable to connect to weather service!',undefined)
    }else if(body.error){
        callback('Unable to find location',undefined) ;
    }else{
        callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} .It feels like ${body.current.feelslike} degrees out.` ) ;
    }
    })
}

module.exports = forecast;