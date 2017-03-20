import * as types from '../constants/ActionTypes'
import colors from '../constants/Color'
import { fromJS } from 'immutable'
import { v4 } from 'node-uuid'


// 初始化便利贴数据
const initialState = {
    message: '',
    loading: false,
    items: []
}

export default (notes = initialState, action) => {

    switch (action.type) {
        case types.ADD_NOTE:
            let randX = parseInt((window.innerWidth - 250) * Math.random(), 10)
            let randY = parseInt((window.innerHeight - 350) * Math.random(), 10)
            let background = colors[parseInt(Math.random() * colors.length, 10)]
            let newNote = {
                id: v4(),
                background,
                completed: false,
                text: action.text,
                createAt: Date.now(),
                level: action.level || 1,
                top: randY,
                left: randX
            }
            return fromJS(notes).update('items', list => list.push(newNote)).set('message', '添加成功').toJS()
        case types.EDIT_NOTE:
            return fromJS(notes).setIn(['items', action.id, 'text'], action.text).toJS()
        case types.DELETE_NOTE:
            return {
                ...notes,
                items: notes.items.filter(note => note.id !== action.id)
            }
        case types.MOVE_NOTE:
            return {
                ...notes,
                items: notes.items.map(note =>
                    note.id === action.id ? { ...note, top: action.top, left: action.left } : note
                )
            }
        default:
            return notes
    }

}