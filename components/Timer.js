import React from "react"
import { connect } from 'react-redux'
import { initTimer } from '../actions/sally'


class Timer extends React.Component {


    componentDidMount() {
        const START_DELAY = 3250; //X seconds
        let musicPlayer = document.getElementById('music-player')
        let metronomePlayer = document.getElementById('metronome-player')
        metronomePlayer.play()
        metronomePlayer.pause()
        metronomePlayer.play()
        setTimeout(() => {
            musicPlayer.play()
            initTimer(this.props.dispatch)
        }, START_DELAY)

        
    }

    getFormatted() {
        const {timer} = this.props
        let date = new Date(null)
        date.setSeconds(timer)
        return date.toISOString().substr(11,8).split(':');
    }


    render() {
        let timerObj = this.getFormatted()
        return (
            <div>
                <div className="timer">
                    <span className="js-hours">{timerObj[0]}</span>
                    <span className="js-minutes">{timerObj[1]}</span>
                    <span className="js-seconds">{timerObj[2]}</span>
                </div>
                <audio id="music-player" controls="false" preload="auto">
                    <source src="/static/sally.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
                <audio id="metronome-player" controls="false" preload="auto">
                    <source src="/static/metronome.mp3" type="audio/mpeg" />
                </audio>
            </div>
        )
    }
}

export default connect(state => ({
    timer: state.sally.timer
}))(Timer)