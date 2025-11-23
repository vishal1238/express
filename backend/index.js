import express from 'express';
import cors from 'cors';

let app = express()

//cors is also know as third party middleware
// app.use(cors({
//     origin: "http://localhost:5173"
// }));

app.use(express.json()) // build-in middleware

// let password = "23abcs"

//custom middleware
// app.use((req, res, next) => {
//     if(req.body.pass != password){
//         res.send("password don't not matched")
//     }
//     next()
// })


app.get("/",(req, res) => {
    // console.log(req.get("user-agent"));
    res.set("x-username","vishal") //we can use set and header both to create custom header
    res.removeHeader("x-powered-by")
    
    res.json({name: "vishal", age: 20})
})


// app.post("/",(req, res) => {
//     console.log(req.body);
//     res.status(200).send({success: true})
// })

app.listen(9000, () => {
    console.log('Server is running at http://localhost:9000/'); 
})
