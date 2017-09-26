import React from "react"
import { connect } from 'react-redux'

class Statistics extends React.Component {

    render() {
        return (
            <div className="statistics">
               <img className="icon icons8-Leaderboard" width="50" height="50" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACE0lEQVRoQ+2Y/TUEMRTF71ZACVSACugAFaACOmAroANUQAdsBVYFqIAOOL89kz2zzGw+JhmZOck5+9fmJe++e99HZqKRrMlIcKgAyY3JwkhhJFEEirQSBTb42FiMXEo6lbTl6cm7pDtJU0+7P9tjALmRdN7REYBcdTkjBpBPSZuS9iTNPZ3ZlfQiCWa2PW1XtscA8l2dGHpWV/vF9aGX16PR1ZGu9r0BuZB0vSZo2QNB/wA4sEgveyCUYkoyQPaHzIjJI8oqfaYtH6MyEtrQ6knf5mhvQGI0tFdJ5ETT6g1Il4bm0sN6AxJFo2sQjQaIjTUTSNu+pv+XQycJuo4RSudtNdVidBwwT9kcZD7bsW2y/D+1AXmT9CGJ7vxYDXemwXW8O4r5cui0AUHfz7Ufhky6Oa2FomxAjMMAeJJ0X7EzSCAGBBJDVl89oYD5h+pO8vOsUsbv650Y+S8QOIusmdXwAXkTwKb8dAJCgh9KOqoxMeuJEUCweNPjB0No0/TgBKSpxsd4jPnEgqcAsqJyAipIWj4XptqLxABBsaGPDQ6IkREN0wy2TWpwklaqKLucS4JvVF9nkNRJy5smeyBUKJIcMCzyZNA5AiDk1da/smfERX7sGS+QnKZaVzbYR1FYGRp9jLPbS12mRrd9OMjO4RaH5n2PG8kCU4AkC23gwYWRwMAlMyuMJAtt4MGFkcDAJTP7ASMseRNaciegAAAAAElFTkSuQmCC" />
               <span>2</span>
               <span>6</span>
            </div>
        )
    }
}

export default connect(state => ({
    
}))(Statistics)