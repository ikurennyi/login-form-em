export const delay = (durationInMs: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, durationInMs))
}
