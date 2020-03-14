import React from 'react';
import Document, { Html ,Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class extends Document {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags }
  }
  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
          <meta name="naver-site-verification" content="848d5681d26ccdd18c24ad6055a9bc2f43649035" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main warning={false}/>
          <NextScript />
        </body>
      </Html>
    )
  }
}