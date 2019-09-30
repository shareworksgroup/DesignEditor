export default class AutoComplete {
    private editor;
    private matchReg;
    private callback;
    on(editor: any, matchReg: RegExp, callback?: Function): void;
    private onInput;
    off(): void;
}
