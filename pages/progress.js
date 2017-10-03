import React from 'react'
import { bindActionCreators } from 'redux'
import initStore from '../store'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head';
import { initTimer } from '../actions/sally'


import Timer from '../components/Timer'
import Statistics from '../components/Statistics'
 
class Progress extends React.Component {


	constructor() {
		super()
		this.state = { hasTappedOut: false }
	}

	static getInitialProps({ isServer }) {
		return { isServer }
	} 

	stopTimer() {
		clearInterval(window._timer)
	}

	render () {		
		let button = <button onClick={this.stopTimer.bind(this)}  className="button">Stop, i'm weak</button>
		

		return (
			<div className="container">
				
				<Statistics />

				<Timer />

				{button}

			</div>
		)
	}
}

export default withRedux(initStore)(Progress)
