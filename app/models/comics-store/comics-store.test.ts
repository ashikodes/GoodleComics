import { ComicsStoreModel } from "./comics-store"

test("can be created", () => {
  const instance = ComicsStoreModel.create({})

  expect(instance).toBeTruthy()
})
