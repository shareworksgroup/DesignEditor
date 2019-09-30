import React from 'react';
declare class SocialItem extends React.Component<ISocialItemProps, ISocialItemState> {
    state: ISocialItemState;
    addItem: () => void;
    modifyItem: (guid: any, icon: any, url: any) => void;
    deleteItem: (guid: any) => void;
    onDragEnd: (result: any) => void;
    onSortEnd: ({ oldIndex, newIndex }: {
        oldIndex: any;
        newIndex: any;
    }) => void;
    render(): JSX.Element;
}
interface ISocialItemProps {
    items?: ISocialItem[];
    onUpdate?: onUpdate;
}
interface ISocialItemState {
    icon: string;
    url: string;
}
export default SocialItem;
