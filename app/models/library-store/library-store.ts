import { types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"

export const LibraryStoreModel = types
  .model("LibraryStore")
  .props({
    loadingBookmarks: false,
    bookmarks: types.optional(types.string, '[]')
  })
  .extend(withEnvironment)
  .actions(self => ({
    setLoadingBookmarks: value => self.loadingBookmarks = value,
    setBookmarksData: data => self.bookmarks = data
  }))
  .actions(self => ({
    getBookmarks: (userId) => {
      self.setLoadingBookmarks(true);
      self.environment.api.fetchBookmarks(userId)
        .then(response => {
          self.setLoadingBookmarks(false)
          if (response.ok) {
            self.setBookmarksData(JSON.stringify(response.data));
          } else {
            __DEV__ && console.tron.log(response)
          }
        })
        .catch(error => {
          self.setLoadingBookmarks(false)
          __DEV__ && console.tron.log(error)
        })
    }
  }))
