import React from 'react';
import { connect } from 'react-redux'

class List extends React.Component {

    

    render() {
        const { list } = this.props;
        return (
            <ul>
                {
                    list.map((item, key) => {
                        return (
                            <li key={key}>{item.text}</li>
                        )
                    })
                }
            </ul>
        )
    }
}

export default connect(state => ({
    list: state.list.list
}))(List)

