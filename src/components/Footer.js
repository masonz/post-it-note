import React, { Component, PropTypes } from 'react'
import NoteInput from './NoteInput'

class Footer extends Component {

    static propsTypes = {
        addNote: PropTypes.func.isRequired
    }

    render() {
        return (
            <footer className="footer">
                <NoteInput addNote={this.props.addNote} />
            </footer>
        )
    }

}

export default Footer