const notes = require('./notes.js')
const yargs = require('yargs')

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add', 'Add new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'Get all notes')
    .command('remove', 'remove note', {
        title: titleOptions
    })
    .command('read', 'Read note', {
        title: titleOptions
    })
    .help()
    .argv

switch (argv._[0]) {
    case 'add':
        var note = notes.addNote(argv.title, argv.body)
        if (note) {
            notes.logNote(note)
            return
        }
        console.log('title taken!')
        break
    case 'list':
        var allNotes = notes.getAll()
        if (allNotes.length) {
            console.log(`Printing ${allNotes.length} note(s)!`)
            allNotes.forEach(notes.logNote)
        } else {
            console.log('No note found')
        }
        break
    case 'remove':
        var r = notes.removeNote(argv.title)
        console.log(r ? 'removed' : 'not removed')
        break
    case 'read':
        var note = notes.getNote(argv.title)
        if (note) {
            notes.logNote(note)
        } else {
            console.log('note not found')
        }
        break
    default:
        console.log('command not found')
}