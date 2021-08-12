import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ComicModel = types
  .model("Comic")
  .props({
    id: types.identifier,
    title: types.maybe(types.string),
    summary: types.maybe(types.string),
    price: types.maybe(types.number),
    imageThumbnail: types.maybe(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type ComicType = Instance<typeof ComicModel>
export interface Comic extends ComicType {}
type ComicSnapshotType = SnapshotOut<typeof ComicModel>
export interface ComicSnapshot extends ComicSnapshotType {}
export const createComicDefaultModel = () => types.optional(ComicModel, {})
