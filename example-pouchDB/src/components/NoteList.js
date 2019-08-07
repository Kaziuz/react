import React from 'react'
import { Link } from 'react-router-dom'

export default function NoteList (props) {
    function renderNotes () {
        const notes = Object.values(props.notes);
        return notes.map((n,idx) => 
            <div key={idx}><h2 className="title-short"><Link to={`/notes/${n._id}`}>{n.title}</Link></h2></div>
        )}

    return (
        <div>
            {renderNotes()}
        </div>
    )
}