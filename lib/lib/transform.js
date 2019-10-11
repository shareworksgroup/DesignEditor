var Transform = /** @class */ (function () {
    function Transform(rawData, extensions) {
        this.data = null;
        this.bodyWidth = 600;
        this.extensions = null;
        this.data = rawData;
        this.extensions = extensions;
    }
    Transform.prototype.toHtml = function () {
        var _this = this;
        var body = this.data.body;
        this.bodyWidth = this.data.body.values.width;
        var htmlBlock = this.transferBody(this.data.body);
        body.rows.forEach(function (row, index) {
            var rowBlock = _this.transferRow(row);
            var cells = row.cells;
            row.columns.forEach(function (column, index) {
                var columnBlock = _this.transferColumn(column, cells[index]);
                column.contents.forEach(function (content, index) {
                    var contentBlock = _this.transferContent(content);
                    columnBlock.content = "" + columnBlock.content + contentBlock;
                });
                rowBlock.content = "" + rowBlock.content + columnBlock.prefix + columnBlock.content + columnBlock.suffix;
            });
            htmlBlock.content = "" + htmlBlock.content + rowBlock.prefix + rowBlock.content + rowBlock.suffix;
        });
        return "" + htmlBlock.prefix + htmlBlock.content + htmlBlock.suffix;
    };
    Transform.prototype.transferBody = function (body) {
        var _a = body.values, backgroundColor = _a.backgroundColor, fontFamily = _a.fontFamily, containerPadding = _a.containerPadding;
        /* eslint-disable */
        return {
            prefix: "<div style=\"box-sizing: border-box;background-color:" + backgroundColor + ";font-family:" + fontFamily + ";margin: 0 auto;padding:" + containerPadding + "\">\n      <style>\n      @import url('https://fonts.googleapis.com/css?family=Charm|Open+Sans+Condensed:300|Oswald|Poppins|Roboto+Condensed|Sarabun|Slabo+27px|Source+Sans+Pro|Ubuntu|ZCOOL+KuaiLe|ZCOOL+QingKe+HuangYou|ZCOOL+XiaoWei');\n      body{margin:0}\n      </style>",
            content: '',
            suffix: '</div>',
        };
        /* eslint-enable */
    };
    Transform.prototype.transferRow = function (row) {
        var _a = row.values, backgroundColor = _a.backgroundColor, columnsBackgroundColor = _a.columnsBackgroundColor, padding = _a.padding, fullWidth = _a.fullWidth, repeat = _a.repeat, center = _a.center, backgroundImage = _a.backgroundImage;
        var bgStyle = "background-image:url(" + backgroundImage + ");background-repeat:" + (repeat ? 'repeat' : 'no-repeat') + ";background-position:" + (center ? 'center top' : 'left top'); // eslint-disable-line
        var wrapperStyle = fullWidth ? bgStyle : '';
        var contentStyle = fullWidth ? '' : bgStyle;
        return {
            prefix: "<div style=\"box-sizing: border-box;background-color:" + backgroundColor + ";" + wrapperStyle + "\">\n      <div style=\"box-sizing: border-box;padding:" + padding + ";width:" + this.bodyWidth + "px;margin:0 auto;\">\n      <table style=\"width:100%;table-layout: fixed;border-spacing: 0;background-color:" + columnsBackgroundColor + ";" + contentStyle + "\">\n      <tr>",
            content: '',
            suffix: "</tr></table></div></div>"
        };
    };
    Transform.prototype.transferColumn = function (column, rowspan) {
        return {
            prefix: "<td colspan=\"" + rowspan + "\" style=\"vertical-align:top;overflow:hidden;padding: 0;border-spacing: 0;\">",
            content: '',
            suffix: "</td>",
        };
    };
    Transform.prototype.transferContent = function (content) {
        var IExtension = this.getExtensionByType(content.values._meta.subtype);
        return new IExtension({}).toHtml(content.values);
    };
    Transform.prototype.getExtensionByType = function (type) {
        return this.extensions.filter(function (extension) { return extension.type === type; })[0];
    };
    return Transform;
}());
export default Transform;
//# sourceMappingURL=transform.js.map