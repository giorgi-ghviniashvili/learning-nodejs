const fs = require('fs')

const fileName = 'notes-data.json'

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync(fileName)
        var json = JSON.parse(notesString)
        return typeof json === 'object' && json.length ? json : []
    } catch (error) {
        return []
    }
}

var saveNotes = (notes) => {
    var notesString = JSON.stringify(notes)
    fs.writeFileSync(fileName, notesString)
}

var addNote = (title, body) => {
    var notes = fetchNotes()
    var note = {
        title,
        body
    }
    if (!notes.some(x => x.title === title)) {
        notes.push(note)
        saveNotes(notes)
        return note
    }
}

var getAll = () => {
    return fetchNotes()
}

var getNote = (title) => {
    var notes = fetchNotes()
    var note = notes.filter(x => x.title == title)
    return note[0]
}

var removeNote = (title) => {
    var notes = fetchNotes()
    var fNotes = notes.filter(x => x.title !== title)
    saveNotes(fNotes)
    return notes.length !== fNotes.length
}

var logNote = (node) => {
    console.log('---')
    console.log('Title:', node.title)
    console.log('Body:', node.body)
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
}