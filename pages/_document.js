import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import Link from 'next/link'

export default class MyDocument extends Document {

	render() {
		return (
			<html>
                <head>
                    <Head>
                        <title>Sally App Sally Down</title>
                    </Head>
                    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui" />
                    <meta name="theme-color" content="#673ab7" />
                    <link rel="manifest" href="" />
                    <link href="https://fonts.googleapis.com/css?family=Encode+Sans+Condensed" rel="stylesheet" />
                    <link href='static/main.css' rel='stylesheet' type='text/css' />
                </head>

				<body id="sallyApp">
                    <div className="logo">
                        <span className="logo__title">
                            <Link href="/"><img src="static/images/sally-logo.svg"/></Link>
                        </span> 
                    </div>
					<Main className="main" />
					<NextScript />
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                </body>
			</html>
		);
	}
}
