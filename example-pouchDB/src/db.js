import PouchDB from 'pouchdb'

export default class DB {
    constructor(name) {
        // this.db = new PouchDB(name)
        this.db = new PouchDB(`http://localhost:5984/notes-react`) // creamos una base de datos o abrimos una existente
    }

    // pedimos todos los documentos
    async getAllNotes() {
        let allNotes = await this.db.allDocs({ include_docs: true })
        let notes = {}

        // en la respuesta viene rows
        allNotes.rows.forEach(n => notes[n.id] = n.doc)

        return notes
    }

    // creamos una nueva nota
    async createNote(note) {
        note.createdAt = new Date()
        note.updatedAt = new Date()

        const res = await this.db.post({ ...note })

        return res
    }

    // actualizamos
    async updateNote(note) {
        note.updatedAt = new Date()

        const res = await this.db.put({ ...note })
        return res
    }
}