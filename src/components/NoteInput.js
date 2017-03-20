import React, { Component, PropTypes } from 'react'

class NoteInput extends Component {

    static propTypes = {
        addNote: PropTypes.func.isRequired
    }

    state = { text: '' }

    handleChange = e => {
        this.setState({ text: e.target.value })
    }

    handleSubmit = e => {
        let { text } = this.state
        if (e.which === 13 && text) {
            this.props.addNote(text)
            this.setState({ text: '' })
        }
    }

    render() {

        const { text } = this.state

        return (
            <input
                type="text"
                value={text}
                className="NoteInput"
                onChange={this.handleChange}
                onKeyDown={this.handleSubmit}
                placeholder="今天要做的事情.."
            />
        )
    }

}

export default NoteInput