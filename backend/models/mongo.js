const path = require('path');
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose') 
// if (process.argv.length < 3) {
//   console.log('give password as argument')
//   process.exit(1)
// }
// const password = process.argv[2]

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery',false)





const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'MangoDB is juicy',
  important: true,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
    return note.save()
  })
  .then(() => {
    console.log('note saved!')
    return mongoose.connection.close()
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })
note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})



// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })

