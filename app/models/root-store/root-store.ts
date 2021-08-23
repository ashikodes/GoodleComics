import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ComicsStoreModel } from "../comics-store/comics-store"
import { UserModel } from "../user/user"
import { GenresStoreModel } from '../genres-store/genres-store';
import { LibraryStoreModel } from '../library-store/library-store';

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  userStore: types.optional(UserModel, {}),
  comicsStore: types.optional(ComicsStoreModel, {}),
  genresStore: types.optional(GenresStoreModel, {}),
  libraryStore: types.optional(LibraryStoreModel, {})
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
