import React from "react"
import { connect } from 'react-redux'

class Timer extends React.Component {

    getFormatted() {
        const {timer} = this.props
        let date = new Date(null)
        date.setSeconds(timer)
        return date.toISOString().substr(11,8).split(':');
    }


    render() {
        let timerObj = this.getFormatted()
        return (
            <div className="timer">
                <span className="js-hours">{timerObj[0]}</span>
                <span className="js-minutes">{timerObj[1]}</span>
                <span className="js-seconds">{timerObj[2]}</span>
            </div>
        )
    }
}

export default connect(state => ({
    timer: state.sally.timer
}))(Timer)