const fs = require ('fs')
const chalk = require('chalk')

// Function responsible to add a note, it takes two argument: one for the note's title and another for the note's body
// Each note is represented as an object
const addNote = (title, body) => {
    // load notes inside an array
    const notes = loadNotes()
    // this is another array that is used to find notes with same title
    // the criteria to find the duplicates is defined in the function below
    // this array is going to have 'undefined' if no duplicates were found
    const duplicateNote = notes.find((note) => note.title === title)

    // if there are no duplicates, we can safely add the note
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("New note added!"))
    }
    // else, a message will be prompted
    else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

// Function responsible to remove a note, it takes just the title as argument
// Each note is represented as an object
const removeNote = (title) => {
    // Same array of addNote()
    const notes = loadNotes()
    // Another array will be created to store the notes to keep
    const notesToKeep = notes.filter((note) => note.title !== title)

    // If the length of notes is greater than notesToKeep, it means that the note has been removed successfully
    if (notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('NOTE REMOVED!'))
        saveNotes(notesToKeep)
    }
    // Else, a message will be prompted
    else {
        console.log(chalk.red.inverse('NO NOTE FOUND!'))
    }  
}
// Function responsible to list the notes, it takes no argument
const listNotes = () => {
    // First we load our notes...
    const notes = loadNotes()

    console.log(chalk.inverse('Your notes'))

    // ...and then we list them
    notes.forEach((note) => {
        console.log(note.title)        
    });
}
// Function responsible to read a note, it takes one argument and it's the title of the note
const readNote = (title) => {
    // First we load our notes
    const notes = loadNotes()
    // Then we look for the title that user is searching for
    const note = notes.find((note) => note.title === title)
    // If we find the note, then we print the title and the note's content
    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }
    // Else we print an error message
    else {
        console.log(chalk.red.inverse('NOTE NOT FOUND!'))
    }
}

// A reusable function that saves our notes in a JSON file
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json", dataJSON)
}


// A reusable function that returns an array of notes
const loadNotes = () => {
    // we try to access the file but if it doesn't exists, the code will stop and go to the catch section returning an empty array
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e){
        return[]
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}