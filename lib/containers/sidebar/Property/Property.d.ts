import React from 'react';
interface IPropertyProps {
    rootStore?: any;
    propertyId?: string;
}
declare class PropertyWrap extends React.Component<IPropertyWrapProps> {
    render(): JSX.Element;
}
interface IPropertyWrapProps extends IPropertyProps {
    className?: string;
    visible?: boolean;
    destroyOnClose?: boolean;
    style?: IKeyValueMap;
}
export default PropertyWrap;
