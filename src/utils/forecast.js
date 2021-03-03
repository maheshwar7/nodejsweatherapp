const request = require('request')

const forecast =(latitude,longitude,callback)=>{
    const url= 'http://api.openweathermap.org/data/2.5/weather?lat='+ encodeURIComponent(latitude) +'&lon='+ encodeURIComponent(longitude) +'&appid=b15a1ee9132e026588dab76a0b75b44e&units=metric'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather services!',undefined)
        }else if(body.message){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,{
                desc:body.weather[0].description +'. Currently its '+body.main.temp+' degress'
    
            })
        }
    })
}

module.exports = forecast