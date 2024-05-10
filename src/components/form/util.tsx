
export const getNearestForm = (current: HTMLElement): any => {
  if (!current) return null;
  const name = current.dataset?.name
  if (name) {
    return name;
  }

  if (current.parentElement) {
    return getNearestForm(current.parentElement)
  }
}