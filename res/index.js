/**
 * This syntax prevent circular import
 * prevent some break in hot reload
 * and optimize the number of file imported
 */
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

module.exports = {
  get images() {
    return require('./images').default;
  },
  get colors() {
    return require('./colors').default;
  },
  get fonts() {
    return require('./fonts').default;
  },
  get languages() {
    return require('./languages').default;
  },
    get width() {
    return width;
  },
  get height() {
    return height;
  },
};
