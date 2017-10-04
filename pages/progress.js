import React from 'react'
import { bindActionCreators } from 'redux'
import initStore from '../store'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head';



import Timer from '../components/Timer'
import Stop from '../components/Stop'
import Scoreboard from '../components/Scoreboard'
 
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
			<div className="container">
				<Timer />
				<Stop />
				<Scoreboard />
			</div>
		)
	}
}

export default withRedux(initStore)(Progress)
