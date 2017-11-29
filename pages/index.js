import React from 'react'
import { bindActionCreators } from 'redux'
import initStore from '../store'
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'

import ConnectedPeople from '../components/ConnectedPeople'
 
class Index extends React.Component {

	render() {
		return (
			<div className="container">
				<div className="logo">
	                <span className="logo__title">
	                    <Link href="/"><img src="static/images/sally-logo.svg"/></Link>
	                </span> 
	            </div>
				<ConnectedPeople />
			</div>
		)
	}
}

export default withRedux(initStore)(Index)
