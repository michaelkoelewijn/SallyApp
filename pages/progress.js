import React from 'react'
import { bindActionCreators } from 'redux'
import initStore from '../store'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head';
import { initTimer } from '../actions/sally'


import Timer from '../components/Timer'
import Statistics from '../components/Statistics'
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

	componentDidMount() {
		initTimer(this.props.dispatch)
	}
	
	render () {		
		return (
			<div className="container">
				
				<Statistics />

				<Timer />

				<Stop />

				<Scoreboard />

			</div>
		)
	}
}

export default withRedux(initStore)(Progress)
