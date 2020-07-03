import React from 'react'
import NoteCard from './noteCard/noteCard'

const NoteList = (props) => {
  return (
    <section>
      {props.notes.map((elm) => (
        <NoteCard
          id={elm.id}
          creationDate={elm.creation_date}
          endDate={elm.end_date}
          note={elm.note}
          user={elm.user}
          tag={elm.tag}
          type={elm.type}
          isTask={elm.is_task}
        />
      ))}
    </section>
  )
}

export default NoteList
