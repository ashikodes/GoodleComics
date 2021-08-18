import { types } from "mobx-state-tree"
import Config from "react-native-config";
import { ComicModel } from "../comic/comic"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
const convertComics = (comic) => {
  const { id, title, summary, price } = comic
  const imageURL = comic?.cover_page?.formats?.thumbnail?.url
  const imageThumbnail = imageURL ? `${Config.API_URL}${imageURL}` : 'https://spng.pngfind.com/pngs/s/203-2031781_8-x-10-case-bound-cover-book-w.png'
  return {
    id: `${id}`,
    title,
    summary,
    price: price || 0,
    imageThumbnail,
  }
}

export const ComicsStoreModel = types
  .model("ComicsStore")
  .props({
    comics: types.optional(types.array(ComicModel), []),
    singleComic: types.optional(types.string, '{}'),
    loadingSingleComics: false
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveSingleComic: (data) => self.singleComic = JSON.stringify(data),
    saveComics: (comics) => {
      const comicModels = comics.map(c => ({ ...c }))
      self.comics.replace(comicModels)
    },
    setLoadingSingleComic: (val) => self.loadingSingleComics = val
  }))
  .actions((self) => ({
    getComics: async () => {
      const response = await self.environment.api.fetchComics()
      if (response.ok) {
        const rawResponse: any = response.data;
        self.saveComics(rawResponse.map(convertComics))
      } else {
        __DEV__ && console.tron.log(response)
      }
    },
    getSingleComic: async (id) => {
      self.setLoadingSingleComic(true)
      const response = await self.environment.api.fetchSingleComic(id)
      self.setLoadingSingleComic(false)
      if (response.ok) {
        const rawResponse: any = response.data;
        self.saveSingleComic(rawResponse)
      } else {
        __DEV__ && console.tron.log(response)
      }
    }
  }))
