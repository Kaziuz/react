import React from 'react'

export default function ShowPage (props) {
    const { note } = props
    return (
        <div>
            <h1>{note.title}</h1>
            <div>{note.body}</div>
        </div>
    )
} 