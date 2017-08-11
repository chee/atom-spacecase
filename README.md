# spacecase
*__formerly camelCaseMode__*

* three modes
  + camelCaseMode
  + kebab-case-mode
  + snake_case_mode

press a key to enable a mode, transforming the letter pressed right
after a <kbd>space</kbd>

for instance, after dispatching `spacecase:toggle-camel`:

please<kbd>`space`</kbd>help<kbd>`space`</kbd>me<kbd>`space`</kbd>mrs<kbd>`space`</kbd>jones comes out like `pleaseHelpMeMrsJones`

you can press <kbd>space</kbd> again to get out of the mode, or <kbd>enter</kbd> or <kbd>escape</kbd>.

## default keybindings

default bindings use `ctrl-shift-space` as prefix key.

* `ctrl-shift-space ctrl-shift-space` toggle camelCaseMode
* `ctrl-shift-space -` toggle kebab-case-mode
* `ctrl-shift-space _` toggle snake_case_mode


## visual indication

can enable some kind of indication for yoself that you in spacecase mode by way of

```less
// styles.less
.spacecase {
  border: 2px solid #ff2a50;
}
```

(`.spacecase` is set on `atom-text-editor`)

## todo

* write tests
* apologise to everybody for everything i've ever done
* meet a princess and live in a castle
* or a prince
