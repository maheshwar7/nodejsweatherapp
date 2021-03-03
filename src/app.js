const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join('__dirname','../templates/views')
const partialsPath = path.join('__dirname','../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Maheshwar Dhadhal'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        name:'Maheshwar Dhadhal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is a helpful text.',
        title:'Help Page',
        name:'Maheshwar Dhadhal'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    const address = req.query.address
    geocode(address,(error,{latitude,longitude,location} = {} )=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastdata.desc,
                location,
                address:req.query.address
            })
       
          })
    })



 
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide search term'
        })        
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name:'Maheshwar Dhadhal',
        error:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        error : 'Page not found',
        name:'Maheshwar Dhadhal'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})
