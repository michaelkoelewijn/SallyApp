import React from "react"
import { connect } from 'react-redux'
import Router from 'next/router'
import { setPlayer, setPlayers, setGameMaster } from '../actions/sally'

import players from '../static/players'

class ConnectedPeople extends React.Component {

    componentDidMount() {
        const io = require('socket.io-client')  
        const HOST = ''
        this.socket = io(HOST)  
        this.socket.on('SERVER:EMIT_PLAYERS', (data) => {
            setPlayers(this.props.dispatch, data)
        });

        this.socket.on('SERVER:SET_GAMEMASTER', (data) => {
            setGameMaster(this.props.dispatch)
        })

        this.socket.on('SERVER:EMIT_READY', (data) => {
            Router.push({
                pathname: '/progress'
            })
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

            setPlayer(this.props.dispatch, playerName)

        }
    }

    emitTimerStart() {
        this.socket.emit('CLIENT:EMIT_READY')
    }

    render() {
        const { people, isGameMaster } = this.props

        let startButton = ''
        if(isGameMaster) {
            startButton = <button onClick={this.emitTimerStart.bind(this)} className="button">Everyone is ready. Let's go!</button>
        }

        return (
            <div className="connected-people">

                <form onSubmit={ this.addPlayer.bind(this) } id="join-session-form" className="join-session">

                    <select required ref={(input) => { this.nameInput = input }}>
                        <option value="" selected="selected" disabled>-- Select your name --</option>
                        { 
                            players.map((player, index) => {
                                return <option key={player.name} value={player.name}>{player.name}</option>
                            }) 
                        }
                    </select>

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

                { startButton }

            </div>
        )
    }
}

export default connect(state => ({
    people: state.sally.people,
    isGameMaster: state.sally.isGameMaster
}))(ConnectedPeople)