import React from "react"
import { connect } from 'react-redux'

class Stop extends React.Component {

    stopTimer() {
        clearInterval(window._timer)
        const { player, timer } = this.props

        const io = require('socket.io-client')  
        const HOST = ''
        this.socket = io(HOST)  
        this.socket.emit('CLIENT:SEND_SCORE_TO_SERVER', {
            'name': player,
            'time': timer
        })

        this.button.style.display = "none"

	}

    render() {
        return (
            <button onClick={this.stopTimer.bind(this)} ref={(button) =>  {this.button = button }} className="button">Stop, i'm weak</button>
        )
    }
}


export default connect(state => ({
    player: state.sally.player,
    timer: state.sally.timer
}))(Stop)