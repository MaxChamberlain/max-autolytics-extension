export const properText = (text: string | null | undefined, splitByUpper?: boolean) => {
  if (text === null || text === undefined) return ''
  text = text.toString()
  if (splitByUpper) return text.replace(/([A-Z])/g, ' $1').trim()
  text = text.replace(/([0-9999])/g, ' $1')
  return text.split(' ').map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  }).join(' ')
}