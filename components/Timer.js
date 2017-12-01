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

    getFormatted(timer) {
        
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
        
        let { timer, playerRecord } = this.props
        let timerObj = this.getFormatted(timer)
  

        let button = ''
        if(this.props.isGameMaster) {
            button = <button ref={(button) => { this.button = button }} onClick={this.startAudio.bind(this)} className="button button--start-audio">Start audio</button>
        }

        let style = {
            color: '#000'
        }
        if(timer <= 0) {
            style = {
                color: '#ff0000'
            }
        }
        let styleNegative = { color: '#ff0000' }
        let stylePositive = { color: '#32CD32' }
        let recordCountdown = timer - playerRecord;

        

        let sign = recordCountdown <= 0 ? '-' : '+';
        let recordStyle = recordCountdown <= 0 ? styleNegative : stylePositive;
        let recordObj = this.getFormatted(recordCountdown);


        let recordHTML = '';
        if(timer > 0) {
            recordHTML = <div style={recordStyle} className="timer time-untill-record">
                            <span>{sign}</span>
                            <span className="js-minutes">{recordObj[1]}</span>
                            <span className="js-seconds">{recordObj[2]}</span>
                        </div>
        }

        return (
            <div className="timer-wrapper">
                <div style={style} className="timer">
                    <span className="js-hours">{timerObj[0]}</span>
                    <span className="js-minutes">{timerObj[1]}</span>
                    <span className="js-seconds">{timerObj[2]}</span>
                </div>


                { recordHTML }

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
    isGameMaster: state.sally.isGameMaster,
    playerRecord: state.sally.playerRecord
}))(Timer)