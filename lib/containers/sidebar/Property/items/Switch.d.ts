/// <reference types="react" />
declare const SwitchItem: ({ title, checked, attribute, onUpdate }: ISwitchItemProps) => JSX.Element;
interface ISwitchItemProps {
    title?: string;
    checked?: boolean;
    attribute?: string;
    onUpdate?: onUpdate;
}
export default SwitchItem;
