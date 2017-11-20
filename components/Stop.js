import React from "react"
import { connect } from 'react-redux'

class Stop extends React.Component {

    stopTimer() {
        clearInterval(window._timer)
        const { player, timer } = this.props

        document.getElementById('sallyApp').classList.add('sally-stop')

        var client = require('./Client.js')
        this.socket = client.socket
        this.socket.emit('CLIENT:SEND_STOP_SIGNAL', {
            'name': player
        })
        this.button.style.display = "none"
	}

    render() {
        let { timer } = this.props;
        let button  = timer <= 0 ? <div></div> : <button onClick={this.stopTimer.bind(this)} ref={(button) =>  {this.button = button }} className="button button--stop">Stop, i'm weak</button>;
        return button;
    }
}


export default connect(state => ({
    player: state.sally.player,
    timer: state.sally.timer
}))(Stop)