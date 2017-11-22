import React from 'react'
import { bindActionCreators } from 'redux'
import initStore from '../store'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head';
import Link from 'next/link'

import Timer from '../components/Timer'
import Stop from '../components/Stop'
import Scoreboard from '../components/Scoreboard'
import Confetti from '../components/Confetti';
 
class Progress extends React.Component {


	constructor() {
		super()
		this.state = { hasTappedOut: false }
	}

	static getInitialProps({ isServer }) {
		return { isServer }
	} 

	
	render () {		
		return (
			<div className="container progress">
				<Timer />
				<Stop />
				<Scoreboard />
				<Confetti />
				<Link href="/statistics"><a className="view-stats">View Stats</a></Link>
			</div>
		)
	}
}

export default withRedux(initStore)(Progress)
