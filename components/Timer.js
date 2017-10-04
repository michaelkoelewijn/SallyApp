import React from "react"
import { connect } from 'react-redux'
import { initTimer } from '../actions/sally'


class Timer extends React.Component {


    componentDidMount() {
        const START_DELAY = 5000; //X seconds
        let musicPlayer = document.getElementById('music-player')
        
        musicPlayer.onplaying = () => {
            initTimer(this.props.dispatch)
        }
        

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
               
            </div>
        )
    }
}

export default connect(state => ({
    timer: state.sally.timer
}))(Timer)