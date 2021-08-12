import { ComicModel } from "./comic"

test("can be created", () => {
  const instance = ComicModel.create({})

  expect(instance).toBeTruthy()
})
