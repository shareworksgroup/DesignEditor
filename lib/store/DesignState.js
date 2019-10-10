var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { observable, action, toJS, runInAction } from 'mobx';
import { guid, findIndex } from '../lib/util';
import { record } from '../lib/history';
import { DesignType, OperationMode, Position } from '../lib/enum';
import { bodyValues, rowValues } from '../lib/values';
var DesignState = /** @class */ (function () {
    function DesignState(transparent) {
        this.data = {
            body: {
                rows: [],
                values: __assign({}, bodyValues, { _meta: {
                        guid: this.guid(),
                        type: DesignType.BODY
                    } })
            }
        };
        this.selected = null;
        this.extensions = [];
        this.extensionGroups = new Set();
        this.attribute = {};
        this.transparent = transparent;
    }
    DesignState.prototype.execCommand = function (method) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        this[method] && this[method].apply(this, rest);
    };
    DesignState.prototype.setSelected = function (guid) {
        var _this = this;
        if (guid === this.selected) {
            return;
        }
        this.selected = null;
        setTimeout(function () {
            runInAction(function () {
                _this.selected = guid;
            });
        });
    };
    DesignState.prototype.addExtension = function (extension) {
        this.extensions.push(extension);
    };
    DesignState.prototype.getExtension = function (type) {
        return this.extensions.find(function (i) { return i.type === type; });
    };
    DesignState.prototype.getExtensions = function () {
        return toJS(this.extensions);
    };
    DesignState.prototype.addExtensionGroup = function (group) {
        this.extensionGroups.add(group);
    };
    DesignState.prototype.getExtensionGroups = function () {
        return Array.from(this.extensionGroups);
    };
    DesignState.prototype.setAttribute = function (type, attribute) {
        this.attribute[type] = attribute;
    };
    DesignState.prototype.getData = function () {
        return toJS(this.data);
    };
    DesignState.prototype.setData = function (json) {
        this.setSelected(null);
        this.data = json;
        this.compatibleWithOldData();
    };
    DesignState.prototype.compatibleWithOldData = function () {
        var _this = this;
        this.data.body.rows.forEach(function (row) {
            row.columns.forEach(function (column) {
                column.contents.forEach(function (content) {
                    var Extension = _this.getExtension(content.values._meta.subtype);
                    if (Extension) {
                        var initAttributes = new Extension({}).getInitialAttribute();
                        content.values = __assign({}, initAttributes, content.values);
                    }
                });
            });
        });
    };
    DesignState.prototype.addRow = function (row) {
        var _this = this;
        this.data.body.rows.push({
            cells: row.cells,
            columns: row.cells.map(function (i) { return ({
                contents: [],
                values: {
                    _meta: {
                        guid: _this.guid(),
                        type: DesignType.COLUMN
                    }
                }
            }); }),
            values: __assign({}, rowValues, { _meta: {
                    guid: this.guid(),
                    type: DesignType.ROW,
                    subtype: row.type,
                } })
        });
    };
    DesignState.prototype.insertRow = function (row, guid, position) {
        var _this = this;
        if (position === void 0) { position = Position.BEFORE; }
        var index = findIndex(this.data.body.rows, function (row) { return row.values._meta.guid === guid; });
        this.data.body.rows.splice(position === Position.BEFORE ? index : index + 1, 0, {
            cells: row.cells,
            columns: row.cells.map(function (i) { return ({
                contents: [],
                values: {
                    _meta: {
                        guid: _this.guid(),
                        type: DesignType.COLUMN
                    }
                }
            }); }),
            values: __assign({}, rowValues, { _meta: {
                    guid: this.guid(),
                    type: DesignType.ROW,
                    subtype: row.type,
                } })
        });
    };
    DesignState.prototype.moveRow = function (row, offsetGuid, position) {
        if (position === void 0) { position = Position.BEFORE; }
        var moveGuid = row.guid;
        var rows = this.data.body.rows;
        var index = findIndex(rows, function (row) { return row.values._meta.guid === moveGuid; });
        var rowData = rows.splice(index, 1)[0];
        if (offsetGuid) {
            var offsetIndex = findIndex(rows, function (row) { return row.values._meta.guid === offsetGuid; });
            rows.splice(position === Position.BEFORE ? offsetIndex : offsetIndex + 1, 0, rowData);
        }
        else {
            rows.push(rowData);
        }
    };
    DesignState.prototype.addContent = function (content, meta) {
        var _this = this;
        this.data.body.rows.forEach(function (row, index) {
            var column = row.columns.filter(function (column) { return column.values._meta.guid === meta.guid; })[0];
            if (column) {
                column.contents.push({
                    values: __assign({}, _this.attribute[content.type], { _meta: {
                            guid: _this.guid(),
                            subtype: content.type,
                            type: DesignType.CONTENT
                        } })
                });
            }
        });
    };
    DesignState.prototype.insertContent = function (content, offsetGuid, columnGuid, position) {
        var _this = this;
        if (position === void 0) { position = Position.BEFORE; }
        this.data.body.rows.forEach(function (row, index) {
            var column = row.columns.filter(function (column) { return column.values._meta.guid === columnGuid; })[0];
            if (column) {
                var index_1 = findIndex(column.contents, function (content) { return content.values._meta.guid === offsetGuid; });
                column.contents.splice(position === Position.BEFORE ? index_1 : index_1 + 1, 0, {
                    values: __assign({}, _this.attribute[content.type], { _meta: {
                            guid: _this.guid(),
                            subtype: content.type,
                            type: DesignType.CONTENT
                        } })
                });
            }
        });
    };
    DesignState.prototype.moveContent = function (content, offsetGuid, columnGuid, position) {
        if (position === void 0) { position = Position.BEFORE; }
        // get and remove content from old position
        var contentData = this.getContent(content.guid, OperationMode.REMOVE);
        this.data.body.rows.some(function (row) {
            var column = row.columns.filter(function (column) { return column.values._meta.guid === columnGuid; })[0];
            if (column) {
                var contents = column.contents;
                if (offsetGuid) {
                    var offsetIndex = findIndex(contents, function (content) { return content.values._meta.guid === offsetGuid; });
                    contents.splice(position === Position.BEFORE ? offsetIndex : offsetIndex + 1, 0, contentData);
                }
                else {
                    contents.push(contentData);
                }
                return true;
            }
            return false;
        });
    };
    DesignState.prototype.getContent = function (guid, operation) {
        var _this = this;
        var content = null;
        this.data.body.rows.some(function (row) {
            row.columns.some(function (column) {
                content = column.contents.filter(function (content) { return content.values._meta.guid === guid; })[0];
                if (content && operation) {
                    var index = findIndex(column.contents, function (content) { return content.values._meta.guid === guid; });
                    if (operation === OperationMode.REMOVE) {
                        column.contents.splice(index, 1);
                    }
                    else if (operation === OperationMode.COPY) {
                        var copy = JSON.parse(JSON.stringify(content));
                        copy.values._meta.guid = _this.guid();
                        column.contents.splice(index + 1, 0, copy);
                    }
                }
                return !!content;
            });
            return !!content;
        });
        return content;
    };
    DesignState.prototype.deleteContent = function (guid) {
        this.getContent(guid, OperationMode.REMOVE);
        this.setSelected(null);
    };
    DesignState.prototype.deleteRow = function (guid) {
        var index = findIndex(this.data.body.rows, function (row) { return row.values._meta.guid === guid; });
        this.data.body.rows.splice(index, 1);
        this.setSelected(null);
    };
    DesignState.prototype.copyContent = function (guid) {
        this.getContent(guid, OperationMode.COPY);
    };
    DesignState.prototype.copyRow = function (guid) {
        var _this = this;
        var row = this.getRow(guid);
        var index = findIndex(this.data.body.rows, function (row) { return row.values._meta.guid === guid; });
        var copy = JSON.parse(JSON.stringify(row));
        copy.values._meta.guid = this.guid();
        copy.columns.forEach(function (column) {
            column.values._meta.guid = _this.guid();
            column.contents.forEach(function (content) {
                content.values._meta.guid = _this.guid();
            });
        });
        this.data.body.rows.splice(index + 1, 0, copy);
    };
    DesignState.prototype.getRow = function (guid) {
        return this.data.body.rows.filter(function (row) { return row.values._meta.guid === guid; })[0];
    };
    DesignState.prototype.getColumn = function (guid) {
        var column = null;
        this.data.body.rows.some(function (row) {
            column = row.columns.filter(function (column) { return column.values._meta.guid === guid; })[0];
            return !!column;
        });
        return column;
    };
    DesignState.prototype.updateAttribute = function (guid, key, value) {
        var _a;
        var data = this.getRow(guid) || this.getContent(guid);
        if (data) {
            data.values = __assign({}, data.values, (_a = {}, _a[key] = value, _a));
        }
    };
    DesignState.prototype.updateBodyAttribute = function (key, value) {
        var _a;
        var data = this.data.body;
        if (data) {
            data.values = __assign({}, data.values, (_a = {}, _a[key] = value, _a));
        }
    };
    DesignState.prototype.getDataByGuid = function (guid) {
        return this.getRow(guid) || this.getContent(guid);
    };
    DesignState.prototype.guid = function () {
        return guid();
    };
    __decorate([
        record(),
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], DesignState.prototype, "execCommand", null);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], DesignState.prototype, "data", void 0);
    __decorate([
        observable,
        __metadata("design:type", String)
    ], DesignState.prototype, "selected", void 0);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], DesignState.prototype, "setSelected", null);
    __decorate([
        observable,
        __metadata("design:type", Array)
    ], DesignState.prototype, "extensions", void 0);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DesignState.prototype, "addExtension", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], DesignState.prototype, "addExtensionGroup", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DesignState.prototype, "setData", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DesignState.prototype, "compatibleWithOldData", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DesignState.prototype, "addRow", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String, Object]),
        __metadata("design:returntype", void 0)
    ], DesignState.prototype, "insertRow", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String, Object]),
        __metadata("design:returntype", void 0)
    ], DesignState.prototype, "moveRow", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], DesignState.prototype, "addContent", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String, String, Object]),
        __metadata("design:returntype", void 0)
    ], DesignState.prototype, "insertContent", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String, String, Object]),
        __metadata("design:returntype", void 0)
    ], DesignState.prototype, "moveContent", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Number]),
        __metadata("design:returntype", Object)
    ], DesignState.prototype, "getContent", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], DesignState.prototype, "deleteContent", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], DesignState.prototype, "deleteRow", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], DesignState.prototype, "copyContent", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], DesignState.prototype, "copyRow", null);
    __decorate([
        record(400),
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, Object]),
        __metadata("design:returntype", void 0)
    ], DesignState.prototype, "updateAttribute", null);
    __decorate([
        record(400),
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", void 0)
    ], DesignState.prototype, "updateBodyAttribute", null);
    return DesignState;
}());
export default DesignState;
//# sourceMappingURL=DesignState.js.map