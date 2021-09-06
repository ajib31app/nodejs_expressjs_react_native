import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// Font family
const light = 'Poppins-Light';
const regular = 'Poppins-Regular';
const medium = 'Poppins-Medium';
const bold = 'Poppins-SemiBold';

// Export font size
// export const sizes = {
//   base: 14,
//   h1: 30,
//   h2: 24,
//   h3: 20,
//   h4: 16,
//   h5: 14,
//   h6: 12,
// };

export const sizes = {
  base: 14,
  h1: 30,
  h2: 24,
  h3: 20,
  h4: wp('4%'),
  h5: wp('3.5%'),
  h6: wp('2.6%'),
};

// Export lineheights
// export const lineHeights = {
//   base: 20,
//   h1: 43,
//   h2: 33,
//   h3: 28,
//   h4: 23,
//   h5: 20,
//   h6: 17,
// };

export const lineHeights = {
  base: 20,
  h1: 43,
  h2: 33,
  h3: 28,
  h4: wp('5%'),
  h5: wp('4.5%'),
  h6: wp('4%'),
};

// Export font family
export default {
  light: {
    fontFamily: light,
  },
  regular: {
    fontFamily: regular,
  },

  medium: {
    fontFamily: medium,
  },

  bold: {
    fontFamily: bold,
    fontWeight: 'bold',
  },

  android: {
    // regular: {
    //   fontFamily: 'sans-serif',
    // },
    // light: {
    //   fontFamily: 'sans-serif-light',
    // },
    // condensed: {
    //   fontFamily: 'sans-serif-condensed',
    // },
    // condensed_light: {
    //   fontFamily: 'sans-serif-condensed',
    //   fontWeight: 'light',
    // },
    // black: {
    //   fontFamily: 'sans-serif',
    //   fontWeight: 'bold',
    // },
    // thin: {
    //   fontFamily: 'sans-serif-thin',
    // },
    // medium: {
    //   fontFamily: 'sans-serif-medium',
    // },
    // bold: {
    //   fontFamily: 'sans-serif',
    //   fontWeight: 'bold',
    // },

    light: {
      fontFamily: light,
    },
    regular: {
      fontFamily: regular,
    },
  
    medium: {
      fontFamily: medium,
    },
  
    bold: {
      fontFamily: bold,
      fontWeight: 'bold',
    },
    
  },
  default: {},
};
