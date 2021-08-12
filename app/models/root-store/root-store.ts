import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ComicsStore, ComicsStoreModel } from "../comics-store/comics-store"
import { UserModel, User } from "../user/user"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  userStore: types.optional(UserModel, {} as User),
  comicsStore: types.optional(ComicsStoreModel, {} as ComicsStore)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
