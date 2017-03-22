import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { DragSource } from 'react-dnd'
import { ItemTypes } from '../constants/DragTypes'
import { Editor, EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js'

const noteSource = {
    beginDrag(props) {
        const { id, top, left } = props.note
        return { id, top, left }
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

    state = {
        show: false, editing: false, editorState: EditorState.createWithContent(
            ContentState.createFromBlockArray(
                convertFromHTML(this.props.note.text)
            )
        )
    }

    handleToggle = () => {
        this.setState({ show: !this.state.show })
    }

    handleDelete = () => {
        this.props.deleteNote(this.props.note.id)
    }

    handlePreview = () => {
        this.setState({ editing: !this.state.editing })
    }

    handleEdit = () => {
        let { id } = this.props.note
        let content = this.state.editorState.getCurrentContent()
        let text = convertToRaw(content).blocks[0].text
        this.props.editNote(id, text)
        this.handlePreview()
    }

    handleChange = (editorState) => {
        this.setState({ editorState })
    }

    render() {

        const { show, editing, editorState } = this.state
        const { note, connectDragSource, isDragging } = this.props
        const { background, top, left, createAt, text } = note

        let date = new Date(createAt)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        const createTime = `${year}-${month}-${day}`

        const classname = classnames({
            'post-in-note': true,
            'active': show,
            'edit': editing
        })

        return connectDragSource(
            <div
                className={classname}
                onMouseEnter={this.handleToggle}
                onMouseLeave={this.handleToggle}
                style={{
                    background,
                    top,
                    left,
                    opacity: isDragging ? 0.4 : 1
                }}>
                {
                    !editing
                    && show
                    && <i className="material-icons fr pointer" onClick={this.handleDelete}>delete</i>
                }
                {
                    show && !editing
                    && <i className="material-icons fr pointer" onClick={this.handlePreview} >info_outline</i>
                }
                {
                    editing
                    && <i className="material-icons fr pointer" onClick={this.handleEdit} >check</i>
                }
                <div className="content">
                    {
                        editing
                            ?
                            <Editor className="text" editorState={editorState} onChange={this.handleChange} />
                            : <p className="text">{text}</p>
                    }
                    <p className="create-time">创建于：{createTime}</p>
                </div>
            </div>
        )
    }

}

export default DragSource(ItemTypes.NOTE, noteSource, collect)(NoteItem)