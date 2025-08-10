import {Dimensions} from 'react-native';

const {fontScale, height, scale, width} = Dimensions.get('window');
export const theme = {
  color: {
    primary: 'radial-gradient(circle, rgb(4, 28, 47), rgb(10, 47, 80))',
  },
  dimensions: {
    fontScale,
    height,
    scale,
    width,
  },
};
