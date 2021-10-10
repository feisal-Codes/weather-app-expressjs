const path = require("path")
const express =require("express")
const hbs = require("hbs")
const util= require("./utils")
const app = express()
const port =process.env.PORT || 3000
const {geocode, forecast}=util
//paths setup
const publicDirectory= path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialPath= path.join(__dirname, "../templates/partials")

//setting the templating engine hbs for express
app.set("view engine", "hbs")
    app.set("views", viewsPath)
hbs.registerPartials(partialPath)



//setting the static directory to serve
app.use(express.static(publicDirectory))

app.get("",(req, res)=>{
  res.render("index",{
      title:"Weather App",
      name:"Feisal Mohamed"
  })
})

app.get("/about",(req, res)=>{
 res.render("about",{
     title:"About Me",
     name:"Feisal Mohamed"
 })
})
app.get("/contact", (req, res)=>{
    res.render("contact",{
        name:"Feisal Mohamed",
        number:"+25472297****",
        address:"official@gmail.com ",
        title:"Contact us"
    },
    )
})

app.get("/about/*",(req,res)=>{
    res.render("404",{
        message:"About article not found",
        name:"feisal mohamed"
    })
})

app.get("/weather",(req, res)=>{
if(!req.query.address){
  return res.send(
       {
     Error:"Search term must be provided"
  })
}
  
   geocode(req.query.address, (error, geocodeData={}) => {
    const { latitude, longtitude, location } = geocodeData;
    if (error) {
      return res.send({
          error:error
      })
    }
    forecast(latitude, longtitude, (error, weatherData) => {
        if (error) {
            return res.send({
                error:error
            })}

     
      // console.log("Temperature of "+weatherData.temperature + " "+ weatherData.weather_descriptions[0])
      res.send({weatherData:weatherData,
        Weather_Description :weatherData.weather_descriptions[0],
        address:req.query.address
    })
    });
  });







//   res.send({
//       forecast:"Weather forecast",
//       location:"forecast location",
//       address:req.query.address
//   })
})
app.get("*",(req, res)=>{
     res.render("404",{
         message:"Page not found",
         name:"feisal mohamed"

     })
})
app.listen(port, ()=>{
     console.log("The server is up and running on port " + port)
})







// const express = require("express")


// const app =express()

// app.get("",(req, res)=>{
    
//     res.send("Hello world, express here")
// })




// app.listen(3000,()=>{
//     console.log("server is up on port 3000")
// })





