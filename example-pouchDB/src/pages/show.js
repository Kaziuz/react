import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

function ShowPage (props) {

    useEffect(() => {
        if(!props.note) {
            props.history.replace('/')
            return
        }
    }, [props.history, props.note])

    function renderDate() {
        let d = dayjs(props.note.updateAt)
        return d.format("MMMM D YYYY, HH:mm")
    }

    function renderContent (note) {
        return (
            <div>
              <h1>{note.title}</h1>
              <div>
                  <p>{note.body}</p>
                  {renderDate()}
              </div>
              <Link to={`/notes/${note._id}/edit`}><button>Edit</button></Link>
              <button onClick={e => props.onDelete(note._id)}>Delete</button>
            </div>
        )
    }

    const { note } = props
    console.log('props in', )

    if (!note) { return null }

    return note && renderContent(note)
}

export default ShowPage