/// <reference types="react" />
import 'rc-slider/assets/index.css';
declare const Slide: ({ title, value, attribute, onUpdate }: ISlideProps) => JSX.Element;
interface ISlideProps {
    title?: string;
    value?: number;
    attribute?: string;
    onUpdate?: onUpdate;
}
export default Slide;
