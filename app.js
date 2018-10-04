console.log('App Started')

const notes = require('./notes.js')
const yargs = require('yargs')

const argv = yargs.argv

switch (argv._[0]) {
    case 'add':
        var note = notes.addNote(argv.title, argv.body)
        if (note) {
            console.log(note)
            return
        }
        console.log('title taken!')
        break
    case 'list':
        console.log(notes.getAll())
        break
    case 'remove':
        var r = notes.removeNote(argv.title)
        console.log(r ? 'removed' : 'not removed')
        break
    case 'read':
        console.log(notes.getNote(argv.title))
        break
    default:
        console.log('command not found')
}