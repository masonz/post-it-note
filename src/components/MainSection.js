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
                    deleteNote={this.props.actions.deleteNote}
                    moveNote={this.props.actions.moveNote}
                />
            </div>
        )
    }

}

export default DragDropContext(HTML5Backend)(MainSection)