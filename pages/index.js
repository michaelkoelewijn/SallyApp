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
				<ConnectedPeople />

				<Link href="/statistics">Stats</Link>

			</div>
		)
	}
}

export default withRedux(initStore)(Index)
