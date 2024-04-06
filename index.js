import express from "express"
import bodyParser from "body-parser"

const app = express();
const port = 4000;

let quotes = [
    {
        id:1,
        quote:"Life is a banquet, and most poor suckers are starving to death!",
        movie:"Auntie Mame",
        year:"1958"
    },
    {
        id:2,
        quote:"Keep your friends close, but your enemies closer.",
        movie:"The Godfather Part II",
        year:"1974"
    },
    {
        id:3,
        quote:"They may take our lives, but they'll never take our freedom!",
        movie:"Braveheart",
        year:"1995"
    },
    {
        id:4,
        quote:"Resolve is never stronger in the morning, after the night it was never weaker.",
        movie:"Naked",
        year:"1993"
    },
    {
        id:5,
        quote:"I've got an infinite number of places to go, the problem is where to stay.",
        movie:"Naked",
        year:"1993"
    },
] 

let lastId = quotes.length

//Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// Codes for the working of the API like Get, Post, Patch, Delete, etc
// 1.GET 
app.get("/quotes",(req,res)=>{  
    let randomIndex = Math.floor(Math.random()*lastId)
    let randomQuote = quotes[randomIndex]
    res.json(randomQuote)
})
// 2.GET all Quotes
app.get("/quotes/all",(req,res)=>{
    res.json(quotes)
})
// 3.GET a specific Quote
app.get("/quotes/:id",(req,res)=>{
    const quoteId = parseInt(req.params["id"])
    const specificQuote = quotes.find((quote)=> quote.id === quoteId)
    res.json(specificQuote)
})
// 4.POST a Quote
app.post("/quotes/post",(req,res)=>{
    const createdQuoteId = lastId+1
    const createdQuote = req.body["quote"]
    const createdQuoteMovie = req.body["movie"]
    const createdQuoteYear = req.body["year"]
    const quoteCreated = {id:createdQuoteId,quote:createdQuote,movie:createdQuoteMovie,year:createdQuoteYear}
    console.log(quoteCreated)
    quotes.push(quoteCreated)
    res.json(quoteCreated)
})
// 5.PATCH a Quote
app.patch("/quotes/:id",(req,res)=>{
    const quoteId = parseInt(req.params["id"])
    const currentQuote = quotes.find((quote)=>quote.id === quoteId)
    if(req.body["quote"]){
        currentQuote.quote = req.body["quote"]
    }
    if(req.body.movie){
        currentQuote["movie"] = req.body["movie"]
    }
    if(req.body.year){
        currentQuote["year"] = req.body["year"]
    }
    res.json(currentQuote)
})
// 6.DELETE a quote
app.delete("/quotes/delete/:id",(req,res)=>{
    const quoteId = parseInt(req.params.id)
    const indexOfQuote = quotes.indexOf((quote)=> quote.id === quoteId)
    if(indexOfQuote){
        quotes.splice(indexOfQuote,1)
        res.json({ message: "Quote deleted" });
    }else{
        res.status(404).json({ message: "No Such Quote.." });
    }
})



app.listen(port,(req,res)=>{
    console.log(`API Server is running on port ${port}`)
})