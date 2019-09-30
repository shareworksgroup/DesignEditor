declare const Util: {
    isParent: (obj: any, parentObj: any) => boolean;
    outClick: (target: any, callback: any) => {
        cancel: () => void;
    };
    canceloutClick: (target: any) => void;
};
export default Util;
