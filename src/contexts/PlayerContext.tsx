import { createContext, ReactNode, useContext, useState } from 'react'
import IEpisode from '../protocols/IEpisode'

type PlayerContextData = {
  episodeList: IEpisode[]
  currentEpisodeIndex: number
  isPlaying: boolean
  play: (episode: IEpisode) => void
  togglePlay: () => void
  setPlayingState: (state: boolean) => void
  playList: (list: IEpisode[], index: number) => void
  playNext: () => void
  hasNext: boolean
  playPrevious: () => void
  hasPrevious: boolean
  toggleLoop: () => void
  isLooping: boolean
  toggleShuffle: () => void
  isShuffling: boolean
  clearPlayerState: () => void
}

type PlayerContextProviderProps = {
  children: ReactNode
}

export const PlayerContext = createContext({} as PlayerContextData)

export function PlayerContextProvider({
  children
}: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  function play(episode: IEpisode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function toggleLoop() {
    setIsLooping(!isLooping)
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  function playList(list: IEpisode[], index: number) {
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length
  const hasPrevious = currentEpisodeIndex > 0

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      )
      setCurrentEpisodeIndex(nextRandomEpisodeIndex)
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  function clearPlayerState() {
    setEpisodeList([])
    setCurrentEpisodeIndex(0)
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        isPlaying,
        togglePlay,
        setPlayingState,
        playList,
        playNext,
        hasNext,
        playPrevious,
        hasPrevious,
        toggleLoop,
        isLooping,
        toggleShuffle,
        isShuffling,
        clearPlayerState
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext)
}
