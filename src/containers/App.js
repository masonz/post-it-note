import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as NoteActions from '../actions/note'
import Footer from '../components/Footer'
import MainSection from '../components/MainSection'

const App = ({ notes, actions }) => (
    <div>
        <MainSection notes={notes.items} actions={actions} />
        <Footer addNote={actions.addNote} />
    </div>
)

App.propTypes = {
    notes: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    notes: state.notes
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(NoteActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)