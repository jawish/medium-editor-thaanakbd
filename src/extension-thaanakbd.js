/**
 * Thaana Keyboard for Medium Editor (https://github.com/yabwe/medium-editor/)
 *
 * @author Jawish Hameed <jawish@gmail.com>
 * @version 0.1
 */

(function () {
    'use strict';

    var ThaanaKbdExtension = MediumEditor.Extension.extend({
        name: 'thaanakbd',

        /* ThaanaKbd Options */
        enabled: true,
        cssClass: 'thaana', // false, to disable
        hotkey: {
            key: 'T',
            meta: true,
            shift: false,
            alt: false
        },
        layout: 'phonetic',
        mapFrom: 'qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./QWERTYUIOP{}|ASDFGHJKL:\"ZXCVBNM<>?()',
        mapTo: { 
            'phonetic': 'ްއެރތޔުިޮޕ][\\ަސދފގހޖކލ؛\'ޒ×ޗވބނމ،./ޤޢޭޜޓޠޫީޯ÷}{|ާށޑﷲޣޙޛޚޅ:\"ޡޘޝޥޞޏޟ><؟)(',
            'phonetic-hh': 'ޤަެރތޔުިޮޕ][\\އސދފގހޖކލ؛\'ޒޝްވބނމ،./ﷲާޭޜޓޠޫީޯޕ}{|ޢށޑޟޣޙޛޚޅ:\"ޡޘޗޥޞޏމ><؟)(',
            'typewriter': 'ޫޮާީޭގރމތހލ[]ިުްަެވއނކފﷲޒޑސޔޅދބށޓޯ×’“/:ޤޜޣޠޙ÷{}<>.،\"ޥޢޘޚޡ؛ޖޕޏޗޟޛޝ\\ޞ؟)('
        },

        init: function () {
            MediumEditor.Extension.prototype.init.apply(this, arguments);

            this.subscribe('editableKeypress', this.handleKeypress.bind(this));
            this.subscribe('editableKeydown', this.handleKeydown.bind(this));

            if (this.cssClass) {
                this.getEditorElements().forEach(function (el) {
                    el.classList.add(this.cssClass);
                }, this);
            }
        },

        handleKeydown: function (event) {
            var keyCode = MediumEditor.util.getKeyCode(event);
            var isMeta = MediumEditor.util.isMetaCtrlKey(event),
                isShift = !!event.shiftKey,
                isAlt = !!event.altKey;

            if (this.hotkey.key.charCodeAt(0) == keyCode && 
                this.hotkey.meta == isMeta &&
                this.hotkey.shift == isShift && 
                this.hotkey.alt == isAlt
                ) {
                
                event.preventDefault();
                event.stopPropagation();

                this.enabled = !this.enabled;
            }
        },

        handleKeypress: function (event) {
            if (!this.enabled) return;

            var mapIndex = this.mapFrom.indexOf(String.fromCharCode(
                MediumEditor.util.getKeyCode(event)
            ));

            if (mapIndex == -1 || !!event.ctrlKey) return;

            event.preventDefault();

            MediumEditor.util.insertHTMLCommand(
                this.document, 
                this.mapTo[this.layout].substr(mapIndex, 1)
            );
        }
    });

    MediumEditor.extensions.thaanaKbd = ThaanaKbdExtension;
}());