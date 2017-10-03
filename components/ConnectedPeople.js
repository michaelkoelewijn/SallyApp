import React from "react"
import { connect } from 'react-redux'
import { setPlayers, setGameMaster } from '../actions/sally'


class ConnectedPeople extends React.Component {

    componentDidMount() {
        const io = require('socket.io-client')  
        const HOST = ''
        let connectedPlayers = []
        this.socket = io(HOST)  
        this.socket.on('SERVER:EMIT_PLAYERS', (data) => {
            setPlayers(this.props.dispatch, data)
        });

        this.socket.on('SERVER:SET_GAMEMASTER', (data) => {
            setGameMaster(this.props.dispatch)
        })

        
    }

    addPlayer(e) {
        e.preventDefault()
        let playerName = this.nameInput.value;
        if(playerName !== '') {
            document.getElementById('join-session-form').style.display = 'none'   
            this.socket.emit('CLIENT:ADD_PLAYER', {
                'name': playerName
            })
        }
    }

    render() {
        const { people, isGameMaster } = this.props

        let startButton = ''
        if(isGameMaster) {
            startButton = <button className="button">Start SallyApp</button>
        }

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
                        people.map((player, key) => {
                            let gameMaster = player.gameMaster ? <i>( Room master )</i> : ''
                            return <li key={key}>{player.name} { gameMaster }</li>
                        })
                    }
                </ul>

                { isGameMaster }

            </div>
        )
    }
}

export default connect(state => ({
    people: state.sally.people,
    isGameMaster: state.sally.isGameMaster
}))(ConnectedPeople)