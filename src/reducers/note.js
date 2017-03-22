import * as types from '../constants/ActionTypes'
import { fromJS } from 'immutable'

const cache = localStorage.getItem('post-in-note')
const cacheState = JSON.parse(cache)

// 初始化便利贴数据
const initialState = cacheState || {
    message: '',
    loading: false,
    items: []
}

export default (notes = initialState, action) => {

    switch (action.type) {
        case types.ADD_NOTE:
            return fromJS(notes).update('items', list => list.push(action.note)).set('message', '添加成功').toJS()
        case types.EDIT_NOTE:
            return {
                ...notes,
                items: notes.items.map(note =>
                    note.id === action.id ? { ...note, text: action.text } : note
                )
            }
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