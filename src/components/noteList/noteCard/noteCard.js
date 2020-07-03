import React from 'react'

const NoteCard = (props) => {
  return (
    <article>
      <div>
        <p>Creation date: {props.creationDate}</p>
        <p>End date: {props.endDate}</p>
      </div>
      <p>{props.note}</p>
      <p>User: {props.user}</p>
      {props.isTask && <p>Pending task!</p>}
      <p>Tags: {props.tag.map((elm) => (`${elm}, `))}</p>
      <hr />
    </article>
  )
}

export default NoteCard
