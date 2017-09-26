import React from 'react'
import { bindActionCreators } from 'redux'
import initStore from '../store'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head';
import { initTimer } from '../actions/sally'

import Timer from '../components/Timer'
 
class Index extends React.Component {

	static getInitialProps({ isServer }) {
		return { isServer }
	} 

	componentDidMount() {
		const { isServer, dispatch, timer } = this.props
		if(isServer) {
			initTimer(dispatch)
		}
	}


	render () {
		return (
			<div className="container">
				
				<Timer />

				<button className="button">Stop, i'm weak</button>

			</div>
		)
	}
}

export default withRedux(initStore)(Index)
