import { types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */

export const ComicsStoreModel = types
  .model("ComicsStore")
  .props({
    comics: types.optional(types.string, '[]'),
    singleComic: types.optional(types.string, '{}'),
    loadingSingleComics: false
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveSingleComic: (data) => self.singleComic = JSON.stringify(data),
    saveComics: (comics) => {
      self.comics = comics
    },
    setLoadingSingleComic: (val) => self.loadingSingleComics = val
  }))
  .actions((self) => ({
    getComics: async () => {
      const response = await self.environment.api.fetchComics()
      if (response.ok) {
        self.saveComics(JSON.stringify(response.data))
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
