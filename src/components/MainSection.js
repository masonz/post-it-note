import React, { Component, PropTypes } from 'react'
import NoteList from './NoteList'
import { DragDropContext, DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { ItemTypes } from '../constants/DragTypes'

const noteTarget = {
    drop(props, monitor, component) {
        let item = monitor.getItem()
        let delta = monitor.getDifferenceFromInitialOffset()
        let left = item.left + delta.x
        let top = item.top + delta.y
        props.actions.moveNote(item.id, top, left)
        // component.moveBox(item.id, left, top)
    }
}

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
})

class MainSection extends Component {

    static propTypes = {
        notes: PropTypes.array.isRequired,
        connectDropTarget: PropTypes.func.isRequired
    }

    render() {

        const { connectDropTarget } = this.props

        return connectDropTarget(
            <div className="main-section">
                {/*<MockNote />*/}
                <NoteList
                    notes={this.props.notes}
                    deleteNote={this.props.actions.deleteNote}
                    moveNote={this.props.actions.moveNote}
                />
            </div>
        )
    }

}

const Section = DropTarget(ItemTypes.NOTE, noteTarget, collect)(MainSection)

export default DragDropContext(HTML5Backend)(Section)