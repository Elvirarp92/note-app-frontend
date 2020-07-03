import React from 'react'

const NoteList = (props) => {
  return(
    <section>
      {props.notes.map((elm) => (<p id={elm.id}>{elm.note}</p>))}
    </section>
  )
}

export default NoteList
