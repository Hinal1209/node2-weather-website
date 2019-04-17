const request=require('request')

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1IjoiaGluYWwiLCJhIjoiY2p1ZTJiMjVxMDUyejQzbW15bjVuY2VzcyJ9.NifJT1vHyW1Ln3oqFHRCMQ&limit=1'
    request({ url,json:true},(error,{body})=>{
             if(error){
                callback('Unable to connect to weather service!',undefined)
             }else if(body.features.length === 0){
                 callback('Unable to find location! Try another search')
             }else{
                 callback(undefined,{
                 latitude : body.features[0].center[1],
                 longitude : body.features[0].center[0],
                 location: body.features[0].place_name   
                 })
             }
         })
}
module.exports=geocode