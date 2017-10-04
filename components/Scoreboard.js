import React from "react"
import { connect } from 'react-redux'

class Scoreboard extends React.Component {

    getFormatted(timer) {
        let date = new Date(null)
        date.setSeconds(timer)
        return date.toISOString().substr(11,8).split(':');
    }

    componentDidMount() {
        const io = require('socket.io-client')
        const HOST = ''
        this.scoreboard = {}
        this.socket = io(HOST)  
        this.socket.on('SERVER:EMIT_ALL_SCORES', (data) => {
            Object.keys(data).map((obj, index) => {
                this.scoreboard[data[obj].name] = data[obj].time
            })
            this.forceUpdate()
        })
    }

    render() {
        if(typeof this.scoreboard == 'object') {
            return (
                <div>
                    <table className="scoreboard">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(this.scoreboard).map((item, index) => {
                                    let timerObj = this.getFormatted(this.scoreboard[item])
                                    return (
                                        <tr key={index}>
                                            <td>{item}</td>
                                            <td>
                                                <span>{timerObj[0]}:</span>
                                                <span>{timerObj[1]}:</span>
                                                <span>{timerObj[2]}</span>
                                            </td>
                                        </tr>
                                    )                                    
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )            
        }else {
            return <div className="scoreboard">Loading scoreboard...</div>
        }
        


    }
}

export default connect(state => ({

}))(Scoreboard)
