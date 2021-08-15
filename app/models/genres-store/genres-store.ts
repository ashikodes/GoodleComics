import { types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"

export const GenresStoreModel = types
  .model("GenresStore")
  .props({
    genres: types.optional(types.string, '[]')
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveGenres: (data) => self.genres = data,
  }))
  .actions((self) => ({
    getGenres: async () => {
      const response = await self.environment.api.fetchGenres()
      if(response.ok) {
        self.saveGenres(JSON.stringify(response.data));
      } else {
        __DEV__ && console.tron.log(response)
      }
    }
  }))
