import React, { useState, useEffect } from 'react';
import Bubbles from './Bubbles';
import ColorList from './ColorList';
import axiosWithAuth from '../utils/axiosWithAuth';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get('/colors')
      .then((res) => setColorList(res.data))
      .catch((err) => console.error(err));
  }, []);

  const updateColors = (editedColor) => {
    setColorList(
      colorList.map((color) => {
        if (color.id === editedColor.id) {
          return editedColor;
        }
        return color;
      })
    );
  };

  return (
    <>
      <ColorList colors={colorList} updateColors={updateColors} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
