import ContentFactory from './ContentFactory';
import { ContentType } from '../../../lib/enum';

export default [ContentFactory(ContentType.BUTTON, 'Button', 'mdi-image-crop-7-5'),
  ContentFactory(ContentType.DIVIDER, 'Divider', 'mdi-content-remove'),
  ContentFactory(ContentType.HTML, 'Html', 'mdi-action-settings-ethernet'),
  ContentFactory(ContentType.IMAGE, 'Image', 'mdi-maps-satellite'),
  ContentFactory(ContentType.TEXT, 'Text', 'mdi-content-text-format')];