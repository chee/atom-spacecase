'use babel'

import {CompositeDisposable} from 'atom'

const PACKAGE = 'spacecase'
const CAMEL_MODE = 'camel'
const KEBAB_MODE = 'kebab'
const SNAKE_MODE = 'snake'

const createModeClass = mode => `${PACKAGE}--${mode}`

export default {
  modalPanel: null,
  subscriptions: null,
  enabled: false,
  editor: null,
  editorView: null,
  transformations: null,
  transforming: false,
  mode: null,
  modeClass: null,

  activate (state) {
    this.transformations = new CompositeDisposable()
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'spacecase:toggle-camel': () => this.toggle(CAMEL_MODE),
      'spacecase:toggle-kebab': () => this.toggle(KEBAB_MODE),
      'spacecase:toggle-snake': () => this.toggle(SNAKE_MODE),
      'spacecase:transform-next-letter': () => this.transformNext(),
      'spacecase:vim-mode-plus-disable': () => this.vimModePlusDisable(),
      'spacecase:disable': () => this.disable()
    }))
  },

  deactivate () {
    this.subscriptions.dispose()
  },

  serialize () {
    return null
  },

  setClass (mode) {
    const {classList} = this.editorView
    classList.add(PACKAGE)
    this.modeClass = createModeClass(mode)
    classList.add(this.modeClass)
  },

  clearClass () {
    const {classList} = this.editorView
    classList.remove(PACKAGE)
    classList.remove(this.modeClass)
    this.modeClass = null
  },

  enable (mode) {
    this.mode = mode
    this.enabled = true
    this.editor = atom.workspace.getActiveTextEditor()
    this.editorView = atom.views.getView(this.editor)
    this.setClass(mode)
    this.editor.onDidDestroy(() => this.disable)
  },

  disable () {
    this.mode = null
    this.enabled = false
    this.transforming = false
    this.transformations && this.transformations.dispose()
    this.editorView && this.clearClass()
    this.editorView = null
  },

  vimModePlusDisable () {
    atom.commands.dispatch(this.editor, 'vim-mode-plus:activate-normal-mode')
    this.disable()
  },

  toggle (mode = CAMEL_MODE) {
    return this.enabled
      ? this.disable()
      : this.enable(mode)
  },

  transform (letter, mode = this.mode) {
    switch (this.mode) {
      case CAMEL_MODE:
        return letter.toUpperCase()
      case KEBAB_MODE:
        return `-${letter}`
      case SNAKE_MODE:
        return `_${letter}`
      default:
        return letter
    }
  },

  transformNext () {
    if (this.transforming) {
      this.disable()
      return this.editor.insertText(' ')
    }

    this.transforming = true

    this.transformations = new CompositeDisposable(
      this.editor.onWillInsertText(({text, cancel}) => {
        if (!text || text.length !== 1) return

        cancel()

        this.transformations.dispose()
        this.editor.insertText(this.transform(text, this.mode))
        this.transforming = false
      })
    )
  }
}
