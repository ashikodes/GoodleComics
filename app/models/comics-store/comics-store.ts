import { Instance, SnapshotOut, types } from "mobx-state-tree"
import Config from "react-native-config";
import { Comic, ComicModel, ComicSnapshot } from "../comic/comic"
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
    comics: types.optional(types.array(ComicModel), [])
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveComics: (comics: ComicSnapshot[]) => {
      const comicModels: Comic[] = comics.map(c => ComicModel.create(c))
      self.comics.replace(comicModels)
    }
  }))
  .actions((self) => ({
    getComics: async () => {
      const response = await self.environment.api.fetchComics()
      if(response.ok) {
        const rawResponse: any = response.data;
        self.saveComics(rawResponse.map(convertComics))
      } else {
        __DEV__ && console.tron.log(response)
      }
    }
  }))

type ComicsStoreType = Instance<typeof ComicsStoreModel>
export interface ComicsStore extends ComicsStoreType {}
type ComicsStoreSnapshotType = SnapshotOut<typeof ComicsStoreModel>
export interface ComicsStoreSnapshot extends ComicsStoreSnapshotType {}
export const createComicsStoreDefaultModel = () => types.optional(ComicsStoreModel, {})
