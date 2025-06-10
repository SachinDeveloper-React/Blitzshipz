import React from 'react';
import {Text, TextProps, StyleSheet, useColorScheme} from 'react-native';
// import {useThemeStore} from '../stores/useThemeStore';

type TextVariant = 'title' | 'subtitle' | 'body' | 'caption';

interface CustomTextProps extends TextProps {
  variant?: TextVariant;
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  variant = 'body',
  style,
  ...props
}) => {
  //   const {colors} = useThemeStore();

  return (
    <Text
      style={[
        styles[variant],
        {
          color: '#000',
        },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 12,
    color: 'gray',
  },
  darkModeText: {
    color: 'white',
  },
});

export default CustomText;
