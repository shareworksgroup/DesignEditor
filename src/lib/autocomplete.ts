
export default class AutoComplete {

  private editor: any = null;
	private matchReg: RegExp = null;
  private callback: Function = null;
  
  public on(editor: any, matchReg: RegExp, callback: Function = () => {} ) {
		if (!editor || !matchReg) {
			throw new Error('please provide editor or match RegExp argument');
		}
		if (this.editor) {
			return;
    }
		this.editor = editor;
		this.matchReg = matchReg;
		this.callback = callback;
		editor.on('Input', this.onInput);
  }
  
  private onInput = () => {
    const offset = this.editor.selection.getRng().endOffset;
    const text = this.editor.selection.getSel().anchorNode.data;
    if (!text) {
      return;
    }
		const match = text.slice(0, offset)
          .match(this.matchReg);
		if (match) {
			const rect = this.editor.selection.getBoundingClientRect();
			this.callback({
				match: true,
				query: match[1] || '',
				position: {
					x: rect.left,
					y: rect.top
				}
			});
		} else {
			this.callback({
				match: false,
			});
		}
  }

  public off () {
    if (!this.editor)
      return;
		this.editor.off('Input');
		this.editor = null;
		this.matchReg = null;
		this.callback = null;
	}
}