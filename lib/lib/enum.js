export var DragType;
(function (DragType) {
    DragType["CONTENT"] = "content";
    DragType["ROW"] = "row";
    DragType["BODY"] = "body";
})(DragType || (DragType = {}));
export var ContentType;
(function (ContentType) {
    ContentType["BUTTON"] = "button";
    ContentType["DIVIDER"] = "divider";
    ContentType["HTML"] = "html";
    ContentType["IMAGE"] = "image";
    ContentType["TEXT"] = "text";
    ContentType["SOCIAL"] = "social";
    ContentType["UNKNOWN"] = "unknown";
})(ContentType || (ContentType = {}));
export var RowType;
(function (RowType) {
    RowType["SINGLE"] = "single";
    RowType["DOUBLE"] = "double";
    RowType["THREE"] = "three";
    RowType["FOUR"] = "four";
    RowType["FIVE"] = "five";
    RowType["ONETWO"] = "onetwo";
    RowType["TWOONE"] = "twoone";
    RowType["ONETWOONETWO"] = "onetwoonetwo";
    RowType["TWOONETWOONE"] = "twoonetwoone";
    RowType["ONEFOURONE"] = "onefourone";
})(RowType || (RowType = {}));
export var OperationMode;
(function (OperationMode) {
    OperationMode[OperationMode["INSERT"] = 1] = "INSERT";
    OperationMode[OperationMode["MOVE"] = 2] = "MOVE";
    OperationMode[OperationMode["REMOVE"] = 3] = "REMOVE";
    OperationMode[OperationMode["COPY"] = 4] = "COPY";
})(OperationMode || (OperationMode = {}));
export var DesignType;
(function (DesignType) {
    DesignType["BODY"] = "u_body";
    DesignType["ROW"] = "u_row";
    DesignType["COLUMN"] = "u_column";
    DesignType["CONTENT"] = "u_content";
})(DesignType || (DesignType = {}));
export var Fonts = {
    "MicroSoft Yahei": "MicroSoft Yahei",
    'ZCOOL KuaiLe': "'ZCOOL KuaiLe', cursive",
    'Slabo 27px': "'Slabo 27px', serif",
    'Source Sans Pro': "'Source Sans Pro', sans-serif",
    'Roboto Condensed': "'Roboto Condensed', sans-serif",
    Sarabun: "'Sarabun', sans-serif",
    Oswald: "'Oswald', sans-serif",
    Charm: "'Charm', cursive",
    'Open Sans Condensed': "'Open Sans Condensed', sans-serif",
    Ubuntu: "'Ubuntu', sans-serif",
    Poppins: "'Poppins', sans-serif",
    'ZCOOL XiaoWei': "'ZCOOL XiaoWei', serif",
    'ZCOOL QingKe HuangYou': "'ZCOOL QingKe HuangYou', cursive"
};
export var Types = {
    Number: 'Number',
    String: 'String',
    Boolean: 'Boolean',
    Object: 'Object',
    Array: 'Array',
    Function: 'Function'
};
export var Position = {
    BEFORE: 1,
    AFTER: 2
};
export var ExtensionGroupGeneral = 'General';
//# sourceMappingURL=enum.js.map