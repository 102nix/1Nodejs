const yargs = require('yargs')
const pkg = require('./package.json')
const { addNote, getNotes, removeNote, updateNote } = require('./notes.conroller')

yargs.version(pkg.version)

yargs.command({
  command: 'add',
  describe: 'Add new note to the list',
  builder: {
    title: {
      type: 'string',
      describe: 'Note title',
      demandOption: true
    }
  },
  handler ({ title }) {
    addNote(title)
  }
})

yargs.command({
  command: 'list',
  describe: 'Print all notes',
  async handler () {
    const notes = await getNotes()
    console.log(notes)
  }
})

yargs.command({
  command: 'remove',
  describe: 'Remove note from the list',
  builder: {
    id: {
      type: 'string',
      describe: 'Note id',
      demandOption: true
    }
  },
  handler ({ id }) {
    removeNote(id)
  }
})

yargs.command({
  command: 'edit',
  describe: 'Edit note from the list',
  builder: {
    id: {
      type: 'string',
      describe: 'Note title',
      demandOption: true
    },
    title: {
      type: 'string',
      describe: 'Note title',
      demandOption: true
    }
  },
  handler ({ id, title}) {
    updateNote(id, title)
  }
})
yargs.parse()

