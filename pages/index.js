import React from 'react'
import { bindActionCreators } from 'redux'
import initStore from '../store'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head';


class Index extends React.Component {

	render () {
		return (
			<div>
				
			</div>
		)
	}
}

export default withRedux(initStore)(Index)
