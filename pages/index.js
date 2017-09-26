import React from 'react'
import { bindActionCreators } from 'redux'
import initStore from '../store'
import withRedux from 'next-redux-wrapper'
import Nav from '../components/Nav'
import Form from '../components/Form'
import List from '../components/List'
import Head from 'next/head';


class Index extends React.Component {

	render () {
		return (
			<div>

				<Head>
					<title>Homepage</title>
				</Head>

				<Nav />

				<h1>Homepage</h1>
				<Form />
				<List />


				

			</div>
		)
	}
}

export default withRedux(initStore)(Index)
