import React, { Component, PropTypes } from 'react'
import colors from '../constants/Color'
import { v4 } from 'node-uuid'

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
            let note = this.generatorNote(text)
            this.props.addNote(note)
            this.setState({ text: '' })
        }
    }

    generatorNote = (text) => {
        const maxWidth = window.innerWidth
        const maxHeight = window.innerHeight
        let randX = parseInt((maxWidth - 250) * Math.random(), 10)
        let randY = parseInt((maxHeight - 350) * Math.random(), 10)
        let background = colors[parseInt(Math.random() * colors.length, 10)]
        let note = {
            text,
            id: v4(),
            level: 1,
            background,
            top: randY,
            left: randX,
            completed: false,
            createAt: Date.now()
        }
        return note
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