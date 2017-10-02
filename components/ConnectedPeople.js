import React from "react"
import { connect } from 'react-redux'
import { addPlayer } from '../actions/sally'





class ConnectedPeople extends React.Component {

    componentDidMount() {
        // const socket = io('http://localhost:3000');
        const io = require('socket.io-client')  
        this.socket = io()  
    }

    addPlayer(e) {
        e.preventDefault()
        let playerName = this.nameInput.value;
        if(playerName !== '') {
            addPlayer(this.props.dispatch, playerName)
            document.getElementById('join-session-form').style.display = 'none'   
            this.socket.emit('CLIENT:ADD_PLAYER', {
                'name': playerName
            })
        }
    }

    render() {

        const { people } = this.props;
        return (
            <div className="connected-people">

                <form onSubmit={ this.addPlayer.bind(this) } id="join-session-form" className="join-session">
                    <input type="text" ref={(input) => { this.nameInput = input }} />
                    <button type="button" type="submit">Join session</button>
                </form>

                <h2>
                     { parseInt(people.length) } player(s) in lobby
                </h2>
                <ul >
                    {
                        people.map((name, key) => {
                            return <li key={key}>{name}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default connect(state => ({
    people: state.sally.people
}))(ConnectedPeople)