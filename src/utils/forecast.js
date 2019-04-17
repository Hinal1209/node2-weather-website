const request=require('request')
const forecast=(latitude,longitude, callback)=>{
const url ='https://api.darksky.net/forecast/81b162cddb7ba791dec8ec0e834fc55c/'+latitude+','+longitude

 request({ url, json: true},(error,{body})=>{
    if(error){
         callback('Unable to connect to weather service!',undefined)
    }else if(body.error){
     callback('Unable to find location!',undefined)
    }
    else{
    callback(undefined,body.daily.data[0].summary +' It is currently '+
    body.currently.temperature+' degrees out there.There is a '+
    body.currently.precipProbability+'% chance of rain out there')
    }
 })
}

module.exports=forecast