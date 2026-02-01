const STORAGE = window.localStorage

export class Storage {
  key: string
  constructor(key: string) {
    this.key = key
  }

  get() {
    const raw = STORAGE.getItem(this.key)

    return raw
  }
  set(value: string) {
    STORAGE.setItem(this.key, value)
  }
}
