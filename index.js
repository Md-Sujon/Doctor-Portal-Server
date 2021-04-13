const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7zutu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express();
app.use(express.json());
app.use(cors());
const port =5000;




app.get('/', function(req, res) {
    res.send("Hello from db it's working")
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const appointmentCollection = client.db("doctorPortal").collection("appointment");
  
  app.post('/Appointment', (req, res) => {
      const appointment = req.body;
      console.log(appointment);
      appointmentCollection.insertOne(appointment)
      .then(result =>{
            res.send(result.insertedCount>0)
      })
  })

  app.post('/appointmentsByDate', (req, res) => {
    const date = req.body;
    console.log(date.date);
    appointmentCollection.find({date: date.date})
    .toArray((err,documents)=>{
        res.send(documents)
    })
})

});


app.listen(process.env.PORT || port);


