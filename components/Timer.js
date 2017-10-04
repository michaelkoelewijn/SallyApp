import React from "react"
import { connect } from 'react-redux'
import { initTimer } from '../actions/sally'
import buzz from "buzz"

class Timer extends React.Component {


    componentDidMount() {
        const START_DELAY = 3250; //X seconds
        let musicPlayer = document.getElementById('music-player')
        let metronomePlayer = document.getElementById('metronome-player')

        var metronome = new buzz.sound('/static/metronome.mp3')
        metronome.play()
        setTimeout(() => {
            var sallyMusic = new buzz.sound('/static/sally.mp3')
            sallyMusic.play()
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
            </div>
        )
    }
}

export default connect(state => ({
    timer: state.sally.timer
}))(Timer)