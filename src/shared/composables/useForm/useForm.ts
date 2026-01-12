import { reactive } from 'vue'

export type RecordsStubType = Record<string, unknown>

export function useForm<TFields extends RecordsStubType = RecordsStubType>({
  fields = {} as TFields,
}: { fields?: TFields } = {}) {
  const form = reactive({
    fields,
    isProcessing: false,
    responseError: '',
    async submit(sender: (fields: TFields) => Promise<void>) {
      this.isProcessing = true

      try {
        await sender(fields)
      } catch (error) {
        const text = error instanceof Error ? error.message : String(error)
        this.responseError = text
      } finally {
        this.isProcessing = false
        setTimeout(() => (this.responseError = ''), 2000)
      }
    },
  })

  return form
}
