import { Header } from '../components/Header'
import { Player } from '../components/Player'
import styles from '../styles/app.module.scss'
import '../styles/global.scss'

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
  )
}

export default MyApp

// arquivo que fica por volta de todas as outras paginas
// é carregado toda vez que o usuário troca de pagina
