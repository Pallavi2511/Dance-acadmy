const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://127.0.0.1:27017/contactDance', {useNewUrlParser:true});
const port = 8000;

//main().catch(err => console.log(err));
// async function main() {
// mongoose.connect('mongodb://127.0.0.1:27017/contactDance', {useNewUrlParser:true});
// }
//define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    concern: String,
    address: String
  });

  var Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res)=>{
  const params = {}
      res.status(200).render('contact.pug',params);
});

app.post('/contact', (req, res)=>{
  var myData = new Contact(req.body);
    myData.save().then(()=>{  
      res.send("saved in database")
    }).catch(()=>{
      res.status(400).send("item not saved in database")
    });
  //res.status(200).render('contact.pug', params);
})

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});