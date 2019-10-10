import React from 'react';

let targetMapping = [];

const _onDocumentClick = e => {
  targetMapping.forEach(obj => {
    if (e.target === obj.target || Util.isParent(e.target, obj.target)) return;
    obj.callbacks.forEach(callback => callback());
  });
};

window.document.body.addEventListener('click', _onDocumentClick);

const Util = {
  isParent: (obj, parentObj) => {
    while (obj !== undefined && obj != null && obj.tagName && obj.tagName.toUpperCase() !== 'BODY') {
      if (obj === parentObj) {
        return true;
      }
      // eslint-disable-next-line no-param-reassign
      obj = obj.parentNode;
    }
    return false;
  },
  outClick: (target, callback) => {
    const callbacks = targetMapping.filter(item => item.target === target);
    if (callbacks.length > 0) {
      callbacks[0].callbacks.push(callback);
    } else {
      targetMapping.push({
        target,
        callbacks: [callback],
      });
    }
    return {
      cancel: () => {
        targetMapping = targetMapping.filter(item => item.target !== target);
      }
    };
  },
  canceloutClick: target => {
    targetMapping = targetMapping.filter(item => item.target !== target);
  }
};

export default Util;
