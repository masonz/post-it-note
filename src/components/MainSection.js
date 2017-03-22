import React, { Component, PropTypes } from 'react'
import NoteList from './NoteList'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class MainSection extends Component {

    static propTypes = {
        notes: PropTypes.array.isRequired
    }

    render() {

        return (
            <div className="main-section">
                {/*<MockNote />*/}
                <NoteList
                    notes={this.props.notes}
                    moveNote={this.props.actions.moveNote}
                    editNote={this.props.actions.editNote}
                    deleteNote={this.props.actions.deleteNote}
                />
            </div>
        )
    }

}

export default DragDropContext(HTML5Backend)(MainSection)