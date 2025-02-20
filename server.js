const express = require('express');
const app=express();

app.use(express.json());

let users = [
    {user:"varsha", email:"varsha@gmail.com", password:"varsha123#"},
    {user:"varshapanda", email:"varshapanda@gmail.com", password:"varshaaa123#"}
]

const isValidEmail=(email)=>{
    return email.includes("@") && email.includes(".") && email.indexOf("@")<email.lastIndex(".");
}
app.get('/get-user', (req,res)=>{
    try{

        const {email} = req.query;
        if(!email){
        return res.status(400).json({error:'User query parameter cannot be empty, email is required '});
        }
    
        if(!isValidEmail){
        return res.status(400).json({error: `Format of the email is wrong, Email should include "@" or "."`})
       }

        const user = users.find(user=>user.email===email);
        if(!user){
        return res.status(404).json({error:'User not found'});
       }
       return res.status(200).json({message:'user fetched successfully', user});
    }
      catch(err){
      return res.status(500).json({error:'Something went wrong, please try again later', err});
    }
})

app.get('/', (req,res)=>{
    return res.json('HELLO WORLD');
})

const port = 8080;
app.listen(port,()=>{
    console.log(`Server is running here http://localhost:${port}`);
});