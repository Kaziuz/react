import React from 'react'

export default function ShowPage (props) {

    console.log('props in', props)

    
    const { note } = props
    
    return note && <div>
            <h1>{note.title}</h1>
            <div>{note.body}</div>
        </div>
}