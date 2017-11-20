import React from "react"
import { connect } from 'react-redux'
import { initTimer } from '../actions/sally'


class Timer extends React.Component {

    constructor() {
        super()
        this.musicPlayer = ''
    }

    componentDidMount() {
        var client = require('./Client.js')
        this.socket = client.socket
        if(this.props.isGameMaster) {
            this.musicPlayer = document.getElementById('music-player')
            this.musicPlayer.onplaying = () => {
                this.socket.emit('CLIENT:SEND_START_SIGNAL', true)
            }
        }

        this.socket.on('SERVER:SEND_START_SIGNAL', (data) => {
            initTimer(this.props.dispatch)
        })
    }

    getFormatted() {
        const {timer} = this.props
        let date = new Date(null)
        date.setSeconds(Math.abs(timer))
        return date.toISOString().substr(11,8).split(':');
    }

    startAudio() {
        this.musicPlayer.play()
        this.button.style.display = "none"
        document.getElementById('sallyApp').classList.add('sally-starting')
    }


    render() {
        let timerObj = this.getFormatted()

        let button = ''
        if(this.props.isGameMaster) {
            button = <button ref={(button) => { this.button = button }} onClick={this.startAudio.bind(this)} className="button button--start-audio">Start audio</button>
        }

        return (
            <div className="timer-wrapper">
                <div className="timer">
                    <span className="js-hours">{timerObj[0]}</span>
                    <span className="js-minutes">{timerObj[1]}</span>
                    <span className="js-seconds">{timerObj[2]}</span>
                </div>
                <audio id="music-player" controls="false" preload="auto">
                    <source src="/static/sally.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>

                { button }
               
            </div>
        )
    }
}

export default connect(state => ({
    timer: state.sally.timer,
    isGameMaster: state.sally.isGameMaster
}))(Timer)