import { types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"

export const GenresStoreModel = types
  .model("GenresStore")
  .props({
    genres: types.optional(types.string, '[]'),
    loadingGenres: types.optional(types.boolean, false)
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveGenres: (data) => self.genres = data,
    setLoadingGenres: (val) => self.loadingGenres = val
  }))
  .actions((self) => ({
    getGenres: () => {
      self.setLoadingGenres(true)
      self.environment.api.fetchGenres()
        .then(response => {
          self.setLoadingGenres(false)
          if (response.ok) {
            self.saveGenres(JSON.stringify(response.data));
          } else {
            __DEV__ && console.tron.log(response)
          }
        })
        .catch(error => {
          self.setLoadingGenres(false)
          __DEV__ && console.tron.log(error)
        })
    }
  }))
