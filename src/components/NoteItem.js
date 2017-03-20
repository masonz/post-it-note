import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { DragSource } from 'react-dnd'
import { ItemTypes } from '../constants/DragTypes'

const noteSource = {
    beginDrag(props) {
        const { id, top, left } = props.note
        return { id, top, left }
    },
    endDrag(props, monitor) {
        const item = monitor.getItem()
        const delta = monitor.getClientOffset()
        if (delta) {
            props.moveNote(item.id, delta.y, delta.x)
        }
    }
}

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
})

class NoteItem extends Component {

    static propTypes = {
        note: PropTypes.object.isRequired,
        deleteNote: PropTypes.func.isRequired,
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired
    }

    state = { show: false }

    handleToggle = () => {
        this.setState({ show: !this.state.show })
    }

    handleDelete = () => {
        this.props.deleteNote(this.props.note.id)
    }

    handleEdit = () => {

    }

    render() {
        const { note, connectDragSource, isDragging } = this.props
        const { background, top, left, createAt, text } = note

        let date = new Date(createAt)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        const createTime = `${year}-${month}-${day}`

        return connectDragSource(
            <div
                className={classnames({
                    'post-in-note': true,
                    'active': this.state.show
                })}
                onMouseEnter={this.handleToggle}
                onMouseLeave={this.handleToggle}
                style={{
                    background,
                    top,
                    left,
                    opacity: isDragging ? 0.5 : 1
                }}>
                <i onClick={this.handleDelete} className="material-icons fr pointer">close</i>
                <i className="material-icons fr pointer" onClick={this.handleEdit} >edit</i>
                <div className="content">
                    <p className="text">{text}</p>
                    <p className="create-time">创建于: {createTime}</p>
                </div>
            </div>
        )
    }

}

export default DragSource(ItemTypes.NOTE, noteSource, collect)(NoteItem)