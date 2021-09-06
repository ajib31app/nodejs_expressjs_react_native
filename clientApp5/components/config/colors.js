import {StyleSheet} from 'react-native';

// Color system
export const white = '#ffffff';
export const grey1 = '#f4f4f4';
export const grey2 = '#e9ecef';
export const grey3 = '#dee2e6';
export const grey4 = '#adb5bd';
export const grey5 = '#999999';
export const grey6 = '#777777';
export const grey7 = '#383838';
export const grey8 = '#1e1e1e';
export const grey9 = '#2C2C2C';
export const black = '#121212';

export const red = '#e60023';
export const orange = '#F2711C';
export const yellow = '#FBBD08';
export const olive = '#B5CC18';
export const green = '#51d96c';
export const teal = '#00B5AD';
export const blue = '#2185D0';
export const violet = '#6435C9';
export const purple = '#A333C8';
export const pink = '#E03997';
export const brown = '#A5673F';




// Export default theme
export const lightColors = {
  key: 'light',
  colors: {
    primary: black,
    secondary: grey6,

    bgColor: white,
    bgColorSecondary: grey1,

    white: white,
    grey1: grey1,
    grey2: grey2,
    grey3: grey3,
    grey4: grey4,
    grey5: grey5,
    grey6: grey6,
    grey7: grey7,
    grey8: grey8,
    black: black,

    greyOutline: '#bbb',
    searchBg: '#303337',
    listItemBg: white,
    success: green,
    error: red,
    warning: yellow,
    disabled: 'hsl(208, 8%, 90%)',
    // Darker color if hairlineWidth is not thin enough
    divider: grey2,
    border: grey2,
    platform: {
      ios: {
        primary: '#007aff',
        secondary: '#5856d6',
        success: '#4cd964',
        error: '#ff3b30',
        warning: '#ffcc00',
      },
      android: {
        primary: '#2196f3',
        secondary: '#9C27B0',
        success: '#4caf50',
        error: '#f44336',
        warning: '#ffeb3b',
      },
    },
  },
  // Component text
  Text: {
    primary: {
      color: black,
    },
    secondary: {
      color: grey6,
    },
    third: {
      color: grey5,
    },
  },

  // Component Icon
  Icon: {
    color: black,
  },

  // Component SearchBar
  SearchBar: {
    bgColor: grey1,
  },

  // navigation Tab
  TabNavigator: {
    tabStyle: {
      borderTopColor: grey1,
      backgroundColor: white,
    },
  },

  // Button
  Button: {
    backgroundColor: black,
    borderColor: black,
    color: white,
    outlineColor: black,
    outlineBorderColor: black,
  },

  // Button
  Modal: {
    backgroundColor: white,
  },

  // Loading
  Loading: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    color: black,
  },

  // ViewLabel
  ViewLabel: {
    color: grey5,
    colorHeading: black,
  },
  // ChooseItem
  ChooseItem: {
    bgColor: 'transparent',
    borderColor: grey2,
    borderColorSub: 'transparent',
    bgColorSelect: 'transparent',
    borderColorSelect: black,
    borderColorSelectSub: black,
    iconSelect: black,
  },

  // ButtonSwiper
  ButtonSwiper: {
    like: {
      backgroundColor: grey2,
      color: black,
    },
    unlike: {
      backgroundColor: grey2,
      color: black,
    },
    delete: {
      backgroundColor: red,
      color: white,
    },
    default: {
      backgroundColor: red,
      color: white,
    },
  },

};

export default lightColors;
