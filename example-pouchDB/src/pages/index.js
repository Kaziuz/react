import React from 'react'
import NoteList from '../components/NoteList'

export default function IndexPage (props) {
    return (
        <div>
            <h1>Notes</h1>
            <NoteList notes={props.notes} />
        </div>
    )
}