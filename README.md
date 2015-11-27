# medium-editor-thaanakbd

Thaana Keyboard extension for Medium Editor (https://github.com/yabwe/medium-editor/)

### Configs:
* enabled: Whether Thaana Keyboard is enabled or not on initialization (default: true)
* cssClass: CSS class to apply to Editor elements (default: 'thaana')
* hotKey: Hotkey combo to enable/disable Thaana keyboard handling (default: meta-T)
* layout: Which Thaana keyboard layout to use (default: 'phonetic')

### Usage:
```javascript
var editor = new MediumEditor('.editable', {
        extensions: {
            'thaanakbd': new MediumEditor.extensions.thaanaKbd(),
        }
 });
```

```css
.thaana {
    direction: rtl;
}
```
