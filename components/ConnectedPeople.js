import React from "react"
import { connect } from 'react-redux'


class ConnectedPeople extends React.Component {
    render() {
        return (
            <div className="connected-people">
                <h2>
                    6 people connected
                </h2>
                <ul >
                    <li>Michael</li>
                    <li>Bart</li>
                    <li>Rutger</li>
                    <li>Cees</li>
                    <li>Emre</li>
                    <li>Dylan</li>
                </ul>
            </div>
        )
    }
}

export default connect(state => ({
    people: state.sally.people
}))(ConnectedPeople)