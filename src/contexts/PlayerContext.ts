import { createContext } from 'react'
import IEpisode from '../protocols/IEpisode'

type PlayerContextData = {
  episodeList: IEpisode[]
  currentEpisodeIndex: number
  isPlaying: boolean
  play: (episode: IEpisode) => void
  togglePlay: () => void
  setPlayingState: (state: boolean) => void
}

export const PlayerContext = createContext({} as PlayerContextData)
