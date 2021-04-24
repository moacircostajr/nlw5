import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import IEpisode from '../../protocols/IEpisode'
import { api } from '../../services/api'
import { parseISO, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'
import styles from './episode.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { usePlayer } from '../../contexts/PlayerContext'

export default function Episode(episode: IEpisode) {
  // FALLBACK TRUE
  // const route = useRouter()
  // if (route.isFallback) return <p>Carregando...</p>

  const { play } = usePlayer()

  return (
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>
        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />
        <button type="button" onClick={() => play(episode)}>
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  )
}

// deve ser usado em toda pagina nomeada com colchete (pagina estatica gerada dinamicamente)
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], // armazena as paginas estaticas
    fallback: 'blocking' // determina o comportamento do next ao não encontrar a pagina solicitada. false = erro 404/ true = tentar buscar dados informados na api. nesse caso a chamada é realizada pelo browser. requer a apresentação de mensagem de carregamento. / 'blocking' = faz a requisição pela camada do node
    // fallback: true ou 'blocking = incremental static regeneration
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params
  const { data } = await api.get(`/episodes/${slug}`)
  const episode: IEpisode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
      locale: ptBR
    }),
    duration: Number(data.file.duration),
    description: data.description,
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    url: data.file.url
  }
  return {
    props: episode,
    revalidate: 60 * 60 * 24 // 24 horas
  }
}
