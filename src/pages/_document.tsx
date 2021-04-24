import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        </Head>
        <body>
          <Main /> {/* local onde fica a aplicação */}
          <NextScript /> {/* contem os scripts do next */}
        </body>
      </Html>
    )
  }
}

// permite configurar o formato do html que fica por volta da aplicação
// é chamado uma única vez
