import React from "react"
import { connect } from 'react-redux'
import Router from 'next/router'
import { setPlayer, setPlayers, setGameMaster, setPlayerRecord } from '../actions/sally'
import Link from 'next/link'
import players from '../static/players'
import * as firebase from 'firebase';

class ConnectedPeople extends React.Component {

    constructor() {
        super();
        this.state = {
            playerFromStorage: ''
        }
    }

    componentDidMount() {
        var client = require('./Client.js')
        this.socket = client.socket

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

        let name = localStorage.player;
        if(typeof name != 'undefined') {
            this.setState({
                playerFromStorage: name
            })
        }

        if(!firebase.apps.length) {
            let database = firebase.initializeApp({
                apiKey: "AIzaSyBIWJftH7QW3WBnsD4jomI3DuGjpiRcPTw",
                authDomain: "sallyapp-895a4.firebaseapp.com",
                databaseURL: "https://sallyapp-895a4.firebaseio.com",
                projectId: "sallyapp-895a4",
                storageBucket: "",
                messagingSenderId: "285316895615"
            });
            
            var databaseDataAsArray = {}
            var usersRef = database.database().ref('users');
            usersRef.on('value', (snapshot) => {
                    this.props.dispatch({
                        'type': 'ADD_STATS',
                        'payload': snapshot
                    })
            });
        }
        

    }

    addPlayer(e) {
        e.preventDefault()

        document.getElementById('sallyApp').classList.add('sally-ready')

        let playerName = this.nameInput.value;
        if(playerName !== '') {
            document.getElementById('join-session-form').style.display = 'none'
            this.socket.emit('CLIENT:ADD_PLAYER', {
                'name': playerName
            })

            setPlayer(this.props.dispatch, playerName)

            //Save to localStorage
            localStorage.setItem('player', playerName)


            

            let { statistics } = this.props;
            let stats = this.getFormattedStatisticsArray(statistics) 
            var scoresByPerson = []
            if(stats[playerName]) {
                stats[playerName].map((data) => {
                    scoresByPerson.push(data.seconds)
                })
            }

            let record = isFinite(Math.max(...scoresByPerson)) ? Math.max(...scoresByPerson) : 0

            setPlayerRecord(this.props.dispatch, record);


        }
    }

    getFormattedStatisticsArray(statistics) {
        let parsedArray = {}
        statistics.forEach((child, key) => {
            var childData = child.val()
            var name = child.key
            parsedArray[name] = []
            for(var record_id in childData) {
                let child = childData[record_id]
                parsedArray[name].push(child)
            }
        })
        return parsedArray
    }

    emitTimerStart() {
        document.getElementById('sallyApp').classList.add('sally-go')
        this.socket.emit('CLIENT:EMIT_READY')
    }

    handleChange() {
        this.setState({
            playerFromStorage: this.nameInput.value
        })
    }

    render() {
        const { people, isGameMaster } = this.props


        let startButton = ''
        if(isGameMaster) {
            startButton = <button onClick={this.emitTimerStart.bind(this)} className="button">Let's go!</button>
        }


        return (
            <div className="connected-people">
                <h2>
                     { parseInt(people.length) } player(s) in lobby
                </h2>
                <form onSubmit={ this.addPlayer.bind(this) } id="join-session-form" className="join-session">

                    <select onChange={this.handleChange.bind(this)} value={this.state.playerFromStorage} required ref={(input) => { this.nameInput = input }}>
                        <option value="" disabled>-- Select your name --</option>
                        {
                            players.map((player, index) => {
                                return <option key={player.name} value={player.name}>{player.name}</option>
                            })
                        }
                    </select>

                    <button type="button" type="submit">Join session</button>
                </form>

                { startButton }

                <ul>
                    {
                        people.map((player, key) => {
                            let gameMaster = player.gameMaster ? <i>( Room master )</i> : ''
                            return <li key={key}>{player.name} { gameMaster }</li>
                        })
                    }
                </ul>



                <Link href="/statistics"><a className="view-stats">View Stats</a></Link>

            </div>
        )
    }
}

export default connect(state => ({
    people: state.sally.people,
    isGameMaster: state.sally.isGameMaster,
    statistics: state.sally.statistics,
}))(ConnectedPeople)
