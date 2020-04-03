export type AnimeList = {
  title: string
  image: string
  url: string
}

export type AnimeListData = {
  data: AnimeList[]
  lang: string
}

export type AnimeSeries = {
  data: AnimeSeriesData[]
}

export type AnimeSeriesData = {
  title: string
  url: string
}

export type AnimeSeriesEpisode = {
  data: AnimeSeriesEpisodeData[]
  lang: string
}

export type AnimeSeriesEpisodeData = {
  host: string
  player: string
}
