'use client';
import React from 'react';
import D3WordCloud from 'react-d3-cloud';
import data from '@/constants/D3WordCloudData';
import { useTheme } from 'next-themes';

type Props = {};

const CustomWordCloud = (props: Props) => {
  const { theme } = useTheme();
  return (
    <>
      <D3WordCloud
        data={data}
        height={350}
        font="Times"
        fontSize={(word) => Math.log2(word.value) * 5}
        rotate={0}
        padding={10}
        fill={theme === 'dark' ? 'white' : 'black'}
        // onWordClick={(e, d) => {
        //   console.log(d);
        // }}
      />
    </>
  );
};

export default CustomWordCloud;
