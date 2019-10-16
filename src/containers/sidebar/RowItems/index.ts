
import RowFactor from './RowFactory';
import { RowType } from '../../../lib/enum';

export default [
  RowFactor(RowType.SINGLE, [1]),
  RowFactor(RowType.DOUBLE, [1, 1]),
  RowFactor(RowType.THREE, [1, 1, 1]),
  RowFactor(RowType.FOUR, [1, 1, 1, 1]),
  RowFactor(RowType.FIVE, [1, 1, 1, 1, 1]),
  RowFactor(RowType.ONETWO, [1, 2]),
  RowFactor(RowType.TWOONE, [2, 1]),
  RowFactor(RowType.ONETWOONETWO, [1, 2, 1, 2]),
  RowFactor(RowType.TWOONETWOONE, [2, 1, 2, 1]),
  RowFactor(RowType.ONEFOURONE, [1, 4, 1])];