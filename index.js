const express = require('express');
const fs = require('fs');
const path = require('path');
const userModel = require('./models/user'); 


const app = express();
const port = 3000;

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.set('view engine' , 'ejs');
app.use(express.static(path.join(__dirname,'public')));

app.get('/' , (req,res) => {
    res.render("index");
});

app.post('/create' , async (req,res) => {
    let {name , email ,url} = req.body;

   let createdUser = await userModel.create({
        name ,
        email,
        url
    });
res.redirect("/read");

});

app.get("/read",  async (req,res) => {
    let users = await userModel.find();
   res.render('read', {users})
});

app.get('/delete/:id' , async (req,res) => {
    let user = await userModel.findOneAndDelete({_id : req.params.id });
    res.redirect("/read");
});

app.get('/edit/:userid', async (req,res) => {
    let user = await userModel.findOne({_id:req.params.userid});
    res.render('edit',{user});
});

app.post('/update/:userid', async (req,res) => {
    let {url,name,email} = req.body;
    let user = await userModel.findOneAndUpdate({_id:req.params.userid},{name,url,email});
    res.redirect('/read');
});

app.listen(port,() =>{
    console.log(`server started at ${port}`);
});
