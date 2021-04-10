const mongoose = require('mongoose')

// filter out incorrect arg inputs
if (process.argv.length < 3 || process.argv.length ===4 || process.argv.length > 5) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

// set up DB connection and schema
const password = process.argv[2]

const url =
  `mongodb+srv://parker:${password}@part3.dmnhj.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

// controllers
if (process.argv.length === 5){
    var newName = process.argv[3]
    var newNumber = process.argv[4]

    const person = new Person({
        name: newName,
        number: newNumber
      })

    person.save().then(result => {
        console.log(`${newName} saved to DB!`)
        mongoose.connection.close()
    })
} else if (process.argv.length === 3){
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name,':', person.number)
        })
        mongoose.connection.close()
      })
}