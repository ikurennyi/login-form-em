import type { RecordsStubType } from '@/shared/composables/useForm/useForm'
import { delay } from '@/shared/utils'

export const logIn = async (fields: RecordsStubType) => {
  await delay(700)
  console.warn('[api::logIn] Form was sent with fields: ', fields)
  throw new Error('No backend - no treasures! <br />  👻 boo!')
}
