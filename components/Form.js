import React from 'react'
import { connect } from 'react-redux'
import { addItem } from '../actions/list'
import List from './List'

class Form extends React.Component {

    _handleSubmit(e) {
        e.preventDefault();
        this.props.dispatch(addItem(this.input.value));
    }

    render() {
        const { list } = this.props;
        return (
            <form onSubmit={this._handleSubmit.bind(this)}>
                <input type="text" ref={(input) => { this.input = input }} />
                <button>Add</button>
            </form>
        )
    }
}

export default connect(state => ({
}))(Form)