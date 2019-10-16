import Guid from 'guid';
import { Types, ContentType, Position } from './enum';
export var guid = function () { return Guid.create().value; };
export var rgb2rgba = function (rgb, alpha) {
    var r = parseInt("0x" + rgb.substr(1, 2), 10);
    var g = parseInt("0x" + rgb.substr(3, 2), 10);
    var b = parseInt("0x" + rgb.substr(5, 2), 10);
    return "rgba(" + r + "," + g + "," + b + "," + alpha / 100 + ")";
};
export var rgba2rgb = function (rgba) {
    if (!rgba) {
        return { rgb: '#fff', alpha: 100 };
    }
    if (rgba.substr(0, 1) === '#') {
        return {
            rgb: rgba,
            alpha: 100,
        };
    }
    /* eslint-disable */
    var rgb = rgba.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?(?:,[\s+]?(.+)[\s+]?)?\)/i);
    return {
        rgb: "#" +
            ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2),
        alpha: parseFloat(rgb[4]) * 100 || 100,
    };
    /* eslint-enable */
};
export var dynamicList = [
    { key: 'keyword one', title: 'keyword one' },
    { key: 'keyword two', title: 'keyword two' },
    { key: 'keyword three', title: 'keyword three' },
    { key: 'keyword four', title: 'keyword four' }
];
export var Config = {
    imageUploadUrl: 'http://localhost:3001/NewUserFeedback/upload',
    mentions: dynamicList,
    contents: [ContentType.BUTTON, ContentType.DIVIDER, ContentType.HTML, ContentType.IMAGE, ContentType.SOCIAL, ContentType.TEXT],
    onUpload: function (data) { return data.fileUrl; },
    onUploadError: function () { },
    set: function (key, value) {
        Config[key] = value;
    },
    get: function (key) {
        return Config[key];
    }
};
export var generateIncressTimer = function (minValue, maxValue, step) {
    if (minValue === void 0) { minValue = 0; }
    if (maxValue === void 0) { maxValue = 100; }
    if (step === void 0) { step = 1000; }
    return function (duration, callback) {
        if (duration === void 0) { duration = 5; }
        var stop = false;
        var residue = duration * 1000;
        var value = getRandomInt(minValue, (maxValue - minValue) / 4);
        callback && callback(value);
        var caculate = function () {
            if (stop) {
                return;
            }
            value = getRandomInt(value, maxValue);
            callback && callback(value);
            residue -= step;
            !stop && residue > 0 && setTimeout(caculate, step);
        };
        !stop && setTimeout(caculate, step);
        return {
            stop: function () {
                stop = true;
            }
        };
    };
};
export var getRandomInt = function (minValue, maxValue) {
    var min = Math.ceil(minValue);
    var max = Math.floor(maxValue);
    return Math.floor(Math.random() * (max - min)) + min;
};
export var extract = function (regular) { return function (text, index) {
    try {
        return text ? text.match(regular)[index] : '';
    }
    catch (e) {
        console.log(e.message);
        return '';
    }
}; };
export var type = function (obj) {
    var type = Object.prototype.toString.call(obj);
    return type.substring(8, type.length - 1);
};
export var getFileExtension = extract(/(\.(\w+)\?)|(\.(\w+)$)/);
export var checkFileExtension = function (extensions) {
    return function (filename) {
        return (type(extensions) === Types.Array ? extensions : [extensions])
            .some(function (i) { return i.toUpperCase() === getFileExtension(filename, 0).toUpperCase(); });
    };
};
export var imageTypes = ['.jpg', '.bmp', '.gif', '.jpeg', '.png'];
export var imgCheck = checkFileExtension(imageTypes);
export var reOrder = function (list, startIndex, endIndex) {
    var result = Array.from(list);
    var removed = result.splice(startIndex, 1)[0];
    result.splice(endIndex, 0, removed);
    return result;
};
export var findIndex = function (array, callback) {
    var index = -1;
    array.some(function (item, i) {
        if (callback(item)) {
            index = i;
            return true;
        }
        return false;
    });
    return index;
};
window.findIndex = findIndex;
export var defaultPosition = Position.BEFORE;
export var getPositionByMiddleOffset = function (dom, mousePosition) {
    var hoverBoundingRect = dom.getBoundingClientRect();
    var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    var clientOffset = mousePosition;
    var hoverClientY = clientOffset.y - hoverBoundingRect.top;
    var position = defaultPosition;
    if (hoverClientY > hoverMiddleY) {
        position = Position.AFTER;
    }
    return position;
};
//# sourceMappingURL=util.js.map