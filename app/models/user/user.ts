import { types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model("User")
  .props({})
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async registerUser(user) {
      return await self.environment.api.registerUser(user)
    },
    
    async loginUser(user) {
      return await self.environment.api.loginUser(user)
    },
  }))