import React, { Component, PropTypes } from 'react'
import NoteItem from './NoteItem'
import update from 'react/lib/update'
import { DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { ItemTypes } from '../constants/DragTypes'

const noteTarget = {
    drop(props, monitor, component) {
        let item = monitor.getItem()
        let delta = monitor.getDifferenceFromInitialOffset()
        let left = item.left + delta.x
        let top = item.top + delta.y
        props.moveNote(item.id, top, left)
        // component.moveBox(item.id, left, top)
    }
}

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
})

class NoteList extends Component {

    static propTypes = {
        notes: PropTypes.array.isRequired,
        deleteNote: PropTypes.func.isRequired,
        moveNote: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired
    }

    render() {

        const { connectDropTarget, notes } = this.props

        const note_list = notes.map((note, index) => {
            return <NoteItem key={note.id} note={note} deleteNote={this.props.deleteNote} moveNote={this.props.moveNote} />
        })

        return connectDropTarget(
            <div className="post-in-note-list">
                {note_list}
            </div>
        )
    }

}

export default DropTarget(ItemTypes.NOTE, noteTarget, collect)(NoteList)