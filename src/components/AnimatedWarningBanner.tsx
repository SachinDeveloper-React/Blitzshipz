import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomText from './CustomText';
// import { AlertTriangle } from 'lucide-react-native'; // Optional: icon lib

type WarningBannerProps = {
  message: string;
  message2: string;
  visible?: boolean;
};

const WarningBanner: React.FC<WarningBannerProps> = ({
  message,
  message2,
  visible = true,
}) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      {/* <AlertTriangle color="#B45309" size={20} style={styles.icon} /> */}
      <CustomText variant="body" style={styles.text}>
        {message}
      </CustomText>
      <CustomText variant="caption" style={styles.text}>
        {message2}
      </CustomText>
    </View>
  );
};

export default WarningBanner;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    margin: 12,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: '#B45309',
    flexShrink: 1,
    textAlign: 'center',
  },
});
