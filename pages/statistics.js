import React from 'react'
import { bindActionCreators } from 'redux'
import initStore from '../store'
import withRedux from 'next-redux-wrapper'
import Stats from '../components/Stats'
import Link from 'next/link'

class Statistics extends React.Component {

    componentDidMount() {
    }

    render() {
        return (
            <div className="container container-wide">
                <h1>Statistics</h1>
                <Link href="/"><a className="back-to-homepage">Back to home</a></Link>
                <Stats />
            </div>
        )
    }

}

export default withRedux(initStore)(Statistics)