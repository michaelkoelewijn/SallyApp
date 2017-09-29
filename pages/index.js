import React from 'react'
import { bindActionCreators } from 'redux'
import initStore from '../store'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head';
import { initTimer, clearTimer } from '../actions/sally'


import Router from 'next/router'

import Timer from '../components/Timer'
import Statistics from '../components/Statistics'
import ConnectedPeople from '../components/ConnectedPeople'
 
class Index extends React.Component {

	componentDidMount() {
		clearTimer(this.props.dispatch)
	}

	startSally() {
		Router.push({
			pathname: '/progress'
		})
	}

	render() {
		return (
			<div className="container">
				<ConnectedPeople />
				<button className="button" onClick={this.startSally.bind(this)}>Start SallyApp</button>
			</div>
		)
	}
}

export default withRedux(initStore)(Index)
