export enum DragType {
  CONTENT = 'content',
  ROW = 'row',
  BODY = 'body',
};


export enum ContentType {
  BUTTON = 'button',
  DIVIDER = 'divider',
  HTML = 'html',
  IMAGE = 'image',
  TEXT = 'text',
  SOCIAL = 'social',
  UNKNOWN = 'unknown',
};

export enum RowType {
  SINGLE = 'single',
  DOUBLE = 'double',
  THREE = 'three',
  FOUR = 'four',
  FIVE = 'five',
  ONETWO = 'onetwo',
  TWOONE = 'twoone',
  ONETWOONETWO = 'onetwoonetwo',
  TWOONETWOONE = 'twoonetwoone',
  ONEFOURONE = 'onefourone',
};

export enum OperationMode {
  INSERT = 1,
  MOVE = 2,
  REMOVE = 3,
  COPY = 4,
};

export enum DesignType {
  BODY = 'u_body',
  ROW = 'u_row',
  COLUMN = 'u_column',
  CONTENT = 'u_content',
};

export const Fonts = {
  "MicroSoft Yahei": "MicroSoft Yahei",
  'ZCOOL KuaiLe': "'ZCOOL KuaiLe', cursive",
  'Slabo 27px': "'Slabo 27px', serif",
  'Source Sans Pro': "'Source Sans Pro', sans-serif",
  'Roboto Condensed': "'Roboto Condensed', sans-serif",
  'Sarabun': "'Sarabun', sans-serif",
  'Oswald': "'Oswald', sans-serif",
  'Charm': "'Charm', cursive",
  'Open Sans Condensed': "'Open Sans Condensed', sans-serif",
  'Ubuntu': "'Ubuntu', sans-serif",
  'Poppins': "'Poppins', sans-serif",
  'ZCOOL XiaoWei': "'ZCOOL XiaoWei', serif",
  'ZCOOL QingKe HuangYou': "'ZCOOL QingKe HuangYou', cursive"
};

export const Types = {
  Number: 'Number',
  String: 'String',
  Boolean: 'Boolean',
  Object: 'Object',
  Array: 'Array',
  Function: 'Function'
};

export const Position = {
  BEFORE: 1,
  AFTER: 2
};