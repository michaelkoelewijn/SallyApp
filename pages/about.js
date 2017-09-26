import React from 'react';
import initStore from '../store'
import withRedux from 'next-redux-wrapper'
import Nav from '../components/Nav';
import List from '../components/List'
import Head from 'next/head'

const About = () => (
    <div>
        <Head>
          <title>About</title>
        </Head>
        <Nav />
        <h1>About</h1>
        <List />
    </div>
);

export default withRedux(initStore)(About)
