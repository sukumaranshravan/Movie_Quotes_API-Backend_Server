import express from "express"
import bodyParser from "body-parser"
import axios from "axios"

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000"

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

// this route is used to render the main page; index.ejs
app.get("/",async (req,res)=>{
    try{
        const response = await axios.get(`${API_URL}/quotes`)
        console.log(response)
        res.render("index.ejs",{movieQuotes:response.data})
    }catch(error){
        res.status(500).json({message:"Error fetching movie quote.."})
    }
})
// this route is to go to the page containing all posts
app.get("/all",async (req,res)=>{
    try{
        const response = await axios.get(`${API_URL}/quotes/all`)
        console.group(response)
        res.render("all_quotes.ejs",{allMovieQuotes:response.data})
    }catch(error){
        res.status(500).json({message:"Error fetching movie quote.."})
    }
})

// this route allows us to go to create a quote and make it ready for post.
app.get("/see", async (req,res)=>{
    res.render("modify.ejs",{ heading: "New Quote", submit: "Create Quote" })
})

// following route allows us to create a new post 
app.post("/create", async (req,res)=>{
    try{
        const response = await axios.post(`${API_URL}/quotes/post`,req.body)
        // console.log(response.data)
        res.redirect("/")
    }catch(error){
        res.status(500).json({message:"Error during creating a quote.."})
    }
})

// below route allows us, to see and edit a quote if it exists already
app.get("/edit/:id", async (req,res)=>{
    try{
        // console.log(req.params.id)
        const response = await axios.get(`${API_URL}/quotes/${req.params["id"]}`)
        // console.log(response.data)
        res.render("modify.ejs",{
            heading: "Quote",
            submit: "Update Quote",
            quoteEdit:response.data
        })
    }catch(error){
        res.status(500).json({message:"Error fetching selected quote.."})
    }
})

// this route allows us to update existing quote and save it, it is a functionality got from the above see or edit quote
app.post("/quotes/:id", async (req,res)=>{
    try{
        const response = await axios.patch(`${API_URL}/quotes/${req.params.id}`,req.body)
        console.log(response.data)
        res.redirect("/")
    }catch(error){
        res.status(500).json({message:"Updation failed.."})
    }
})

// this route is for deleting a particular quote.
app.get("/remove/:id", async (req,res)=>{
    try{
        const response = await axios.delete(`${API_URL}/quotes/delete/${req.params.id}`)
        res.redirect("/")
    }catch(error){
        res.status(500).json({message:"Something went wrong.."})
    }
})



app.listen(port,(req,res)=>{
    console.log(`Your Backend Server is running on port ${port} and ready to connect with the API`)
})