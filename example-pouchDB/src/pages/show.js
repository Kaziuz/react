import React from 'react'
import { Link } from 'react-router-dom'

export default function ShowPage (props) {
    const { note } = props
    console.log('props in', )
    if (!note) { return null }
    
    return note && <div>
            <h1>{note.title}</h1>
            <div>{note.body}</div>
            <Link to={`/notes/${props.note._id}/edit`}><button>edit</button></Link>
        </div>
}