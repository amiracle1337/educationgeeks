export enum EmailList {
  Marketing = "marketing",
  Product = "product",
  All = "all",
}

export enum EmailTemplate {
  Dummy = "dummy",
  Promotion = "promotion",
}

export type VariableType = {
  key: string
  value: string
  id: string
  isTextArea?: boolean
}

export type SpecialVariables = {
  userName: string
  userEmail: string
  userId: string
  userBio: string
  userUsername: string
  userAvatarImageKey: string
}
