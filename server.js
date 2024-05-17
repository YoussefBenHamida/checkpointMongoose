const express = require('express')
const app = express()
const connectDB = require('./config/conectDB')
connectDB()


const Person = require("./schema/person") 
//add person
const youssef = new Person ({
    name : "youssef",
    age : 19,
    favoriteFoods:["oja","couscous"]

})

youssef.save() 

// //model creature 
Person.create([
    {name : "imen",
    age:"28",
    favoriteFoods:["pasta","jelbena"]
    },
    {
        name :"azziz",
        age :"19",
        favoriteFoods :["sandwich kafteji","ras 3alouch"]
    }])
    .then(result => { 
        console.log(result)})

 //find 
 Person.find({ name: 'youssef'})
 .then(docs => {
    console.log('Person found:', docs);
  })
  .catch(err => {
    console.error('Error finding Person:', err);
  });;  

  //findOne  
  Person.findOne({favoriteFoods : "pasta"})
  .then(docs=>{
    console.log("Person with favoriteFood Pasta: ", docs)
  })
  .catch(err=>{
    console.error('Error finding: ',err)
  })

// findById 
const id = '66465250ecd9e7d6af3c67a2'
const aziz = Person.findById(id)
.then(docs=>{
  console.log("Person with this Id: ",docs)
})
.catch(err=>{
  console.log('error to find by Id: ', err)
})

// //add hamburger 
async function addFavoriteFood(id) {
  try {
    const person = await Person.findById(id);
    person.favoriteFoods.push('hamburger');
    await person.save();
    console.log('Favorite food added and person updated:', person);
  } catch (error) {
    console.error('Error updating person:', error);
  }
}
addFavoriteFood('66465250ecd9e7d6af3c67a2');

//deleting mary
Person.create([
  {name : "mary",
  age:"64",
  favoriteFoods:["riz","pizza"]
  }])
  .then(result => { 
            console.log(result)})
Person.deleteOne({name : "mary"}).then(result => { 
  console.log(result) 
}) 

// Chain search query 
Person.find({favoriteFoods:"hamburger"}).sort({name:1}).limit(2).select('-age')
.then(result => { 
    console.log(result) })   


// port 
const port = 1001
app.listen(port, (err)=>{
    err?err:console.log(`Running on server ${port}`)
}) 




