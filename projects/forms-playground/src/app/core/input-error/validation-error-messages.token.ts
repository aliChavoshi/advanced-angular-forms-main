import { InjectionToken } from "@angular/core"

export const ERROR_MESSAGES: { [key: string]: (args?: any) => string } = {
  required: () => `This field is required`,
  requiredTrue: () => `This field is required`,
  email: () => `It should be a valid email`,
  minlength: ({ requiredLength }) => `The length should be at least ${requiredLength} characters`,
  banWords: ({ bannedWord }) => `The word "${bannedWord}" isn't allowed`,
  appBanWords: ({ bannedWord }) => `The word "${bannedWord}" isn't allowed`,
  appPasswordShouldMatch: () => `Password should match`,
  passwordShouldMatch: () => `Password should match`,
  pattern: () => `Wrong format`,
  appUniqueNickname: () => `Nickname is taken`,
  uniqueName: () => `Nickname is taken`,
}

export const VALIDATION_ERROR_MESSAGES = new InjectionToken(`Validation Messages`, {
  providedIn: 'root',
  factory: () => ERROR_MESSAGES
})
