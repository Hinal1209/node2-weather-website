const path=require('path')
const express = require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))

const app=express()

const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Hinal'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Hinal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Hinal',
        helpText:'This is some helpful text'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude , longitude , location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })

          })
        
    })
})
    
    // res.send({
    //     forecast: 'Is is hot', 
    //     location: 'philadelphia',
    //     address: req.query.address 
    // })

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404 help',
        name: 'Hinal',
        errorMessage:'404 help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Hinal ',
        errorMessage:'404 page not found'
    })
})

//app.com
//app.com/help
//app.com/about
app.listen(3000,()=>{
    console.log('Server is on port 3000!')
})