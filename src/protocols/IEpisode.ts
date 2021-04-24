export default interface IEpisode {
  id: string
  title: string
  thumbnail: string
  members: string
  publishedAt: string
  duration: number
  description?: string
  durationAsString: string
  url: string
}
