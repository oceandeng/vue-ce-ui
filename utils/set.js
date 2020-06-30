export const find = (arr, key) => {
  return arr.indexOf(key) !== -1
}

export const add = (arr, key) => {
  const index = arr.indexOf(key)
  if (index === -1) {
    arr.push(key)
  }
}

export const remove = (arr, key) => {
  const index = arr.indexOf(key)
  if (index !== -1) {
    arr.splice(index, 1)
  }
}
