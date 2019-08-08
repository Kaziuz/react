import React from 'react'

export default function ShowPage (props) {
    const { note } = props

    if (!note) { return null }
    
    return note && <div>
            <h1>{note.title}</h1>
            <div>{note.body}</div>
        </div>
}