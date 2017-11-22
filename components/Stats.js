import React from "react"
import { connect } from 'react-redux'
// import * as firebase from 'firebase';

class Stats extends React.Component {
    
    getFormattedStatisticsArray(statistics) {
        let parsedArray = {}
        statistics.forEach((child, key) => {
            var childData = child.val()
            var name = child.key
            parsedArray[name] = []
            for(var record_id in childData) {
                let child = childData[record_id]
                parsedArray[name].push(child)
            }
        })
        return parsedArray
    }

    getFormatted(timer) {
        let date = new Date(null)
        date.setSeconds(timer)
        return date.toISOString().substr(11,8).split(':');
    }

    render() {
        const { statistics} = this.props
        let stats = this.getFormattedStatisticsArray(statistics)      
        

        var scoresByPerson = {}

        //Build unique dates
        var uniqueDates = []
        Object.keys(stats).map((name, key) => {

            scoresByPerson[name] = []

            stats[name].map((data) => {
                if(uniqueDates.indexOf(data.date) == -1) {
                    uniqueDates.push(data.date)
                }

                scoresByPerson[name].push(data.seconds)

            })


        })


        uniqueDates.sort((a, b) => {
            return new Date(b).getTime() - new Date(a).getTime()
        })

        var parsedTableArray = {}
        var highestScoreByDate = {}
        uniqueDates.map((date, key) => {
            parsedTableArray[date] = []
            highestScoreByDate[date] = 0
            Object.keys(stats).map((name, key) => {
                let scores = stats[name]

                scores.filter((data, key) => {
                    if(data.date == date) {
                        return true
                    }
                }).map((data) => {
                    parsedTableArray[date][name] = data.seconds
                    if(data.seconds > highestScoreByDate[date]) {
                        highestScoreByDate[date] = data.seconds
                    }
                })

            })
        })
  
        return (
            <div>
                <table className="statistics">
                    <thead>
                        <tr>
                            <th></th>
                            {
                                Object.keys(stats).map((name, key) => {
                                    return <th key={key}>{name}</th>        
                                })
                            }  
                        </tr>

                        <tr>
                            <td>Record</td>
                            {
                                Object.keys(scoresByPerson).map((name, key) => {
                                    let seconds = this.getFormatted(Math.max(...scoresByPerson[name])) 
                                    return <td key={key}><span className="personal-record">{`${seconds[1]}:${seconds[2]}`}</span></td>
                                })
                            }
                        </tr>

                    </thead>
                    <tbody>
                        {
                            uniqueDates.map((date, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{date}</td>
                                        {

                                            Object.keys(stats).map((name, key) => {
                                                let seconds = parsedTableArray[date][name]                                               
                                                if(typeof seconds == 'undefined' || parseInt(seconds) === 0 || seconds == '') {
                                                    return (
                                                        <td key={key}>--</td>
                                                    )
                                                }else {
                                                    let score = this.getFormatted(seconds)                                                   
                                                    return (
                                                        <td key={key} className={ highestScoreByDate[date] == seconds ? 'daily-winner' : '' }>
                                                            <span>{score[1]}</span>
                                                            <span>{score[2]}</span>
                                                        </td>
                                                    )
                                                }
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(state => ({
    statistics: state.sally.statistics
}))(Stats)