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

	componentDidMount() {
		const { isServer, dispatch, timer } = this.props
		this.interval = setInterval(() => {
			initTimer(dispatch)
		}, 1000)
	}

	stopTimer(e) {
		e.preventDefault()
		clearTimeout(this.interval)
		this.setState({ hasTappedOut: true })
	}

	sendToAPI(e) {
		e.preventDefault()
		alert('Thank you sensei')
	}

	render () {
		let button = null;
		if(this.state.hasTappedOut) {
			button = <button onClick={this.sendToAPI.bind(this)} className="button">Send to API</button>
		}else{
			button = <button onClick={this.stopTimer.bind(this)} className="button">Stop, i'm weak</button>
		}

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
