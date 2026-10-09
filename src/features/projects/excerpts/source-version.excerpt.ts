export const isNewerVersion = ({
  cached,
  downloaded
}: {
  cached: SourceValidators | null
  downloaded: SourceValidators
}): boolean => {
  if (cached?.lastModified == null || downloaded.lastModified === null) {
    return true
  }
  return (
    Date.parse(downloaded.lastModified) >
    Date.parse(cached.lastModified)
  )
}
