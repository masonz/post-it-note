import React, { Component, PropTypes } from 'react'
import NoteItem from './NoteItem'
import { DropTarget } from 'react-dnd'
import { ItemTypes } from '../constants/DragTypes'

const noteTarget = {
    drop(props, monitor, component) {
        let item = monitor.getItem()
        let delta = monitor.getDifferenceFromInitialOffset()
        let left = item.left + delta.x
        let top = item.top + delta.y
        if (left < 0) {
            left = 0
        }
        if (top < 0) {
            top = 10
        }
        if (left + 300 > window.innerWidth) {
            left = window.innerWidth - 250
        }
        if (top + 400 > window.innerHeight) {
            top = window.innerHeight - 350
        }
        props.moveNote(item.id, top, left)
    }
}

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
})

class NoteList extends Component {

    static propTypes = {
        notes: PropTypes.array.isRequired,
        editNote: PropTypes.func.isRequired,
        moveNote: PropTypes.func.isRequired,
        deleteNote: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired
    }

    render() {

        const { connectDropTarget, notes } = this.props

        const note_list = notes.map((note, index) => {
            return (
                <NoteItem
                    note={note}
                    key={note.id}
                    editNote={this.props.editNote}
                    moveNote={this.props.moveNote}
                    deleteNote={this.props.deleteNote} />
            )
        })

        return connectDropTarget(
            <div className="post-in-note-list">
                {note_list}
            </div>
        )
    }

}

export default DropTarget(ItemTypes.NOTE, noteTarget, collect)(NoteList)