import { find, add, remove } from './set'
export default class {
  constructor () {
    this.loading = []
  }
  is (key) {
    return find(this.loading, key)
  }
  open (key) {
    return add(this.loading, key)
  }
  close (key) {
    return remove(this.loading, key)
  }
  closeAll () {
    this.loading = []
  }
}
