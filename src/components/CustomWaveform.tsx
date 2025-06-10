import React from 'react';
import {View} from 'react-native';
import Svg, {Rect} from 'react-native-svg';

const CustomWaveform = ({amplitudes}: {amplitudes: number[]}) => {
  const barWidth = 4;
  const gap = 2;
  const barColor = '#007bff';
  const height = 60;

  return (
    <Svg
      height={height}
      width={(barWidth + gap) * amplitudes.length}
      style={{
        flex: 1,
      }}>
      {amplitudes.map((amp, i) => (
        <Rect
          key={i}
          x={i * (barWidth + gap)}
          y={height / 2 - amp / 2}
          width={barWidth}
          height={amp}
          fill={barColor}
          rx={2}
        />
      ))}
    </Svg>
  );
};

export default CustomWaveform;
