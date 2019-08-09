import PouchDB from 'pouchdb'

export default class DB {
    constructor(name) {
        // this.db = new PouchDB(name)
        this.db = new PouchDB('notes-react') // creamos una base de datos o abrimos una existente
        this.remoteDB = (`http://localhost:5984/notes-react`)

        // sincronizo la base de datos
        PouchDB.sync(this.db, this.remoteDB, {
            live: true,
            heartbeat: false,
            timeout: false,
            retry: true
        })
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

    async deleteNote(note) {
        await this.db.remove(note)
    }
}