export const programClosingDate = (program: any): Date | null => {
  const value = program?.registrationEndsAt || program?.endDate
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

export const isProgramOpen = (program: any): boolean => {
  if (!program || program.status !== 'active') return false
  const closesAt = programClosingDate(program)
  return !closesAt || closesAt.getTime() >= Date.now()
}

export const formatProgramClosing = (program: any): string => {
  const closesAt = programClosingDate(program)
  if (!closesAt) return 'Open until filled'
  return `Closes ${closesAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
}
