import React from "react"
import { connect } from 'react-redux'

class Stop extends React.Component {

    stopTimer() {
        clearInterval(window._timer)
        const { player, timer } = this.props

        var client = require('./Client.js')
        this.socket = client.socket
        this.socket.emit('CLIENT:SEND_STOP_SIGNAL', {
            'name': player
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