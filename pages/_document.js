import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
	render() {
		return (
			<html>
                <head>
                    <Head>
                        <title>Todo App</title>
                    </Head>
                    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui" />
                    <meta name="theme-color" content="#673ab7" />
                    <link rel="manifest" href="" />
                    <link href="https://fonts.googleapis.com/css?family=Encode+Sans+Condensed" rel="stylesheet" />
                    <link href='static/main.css' rel='stylesheet' type='text/css' />
                </head>

				<body>

                    <div className="logo">
                        <span className="logo__title">SallyApp</span>
                        <span className="logo__slogan">Just an activity</span>
                    </div>

					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}