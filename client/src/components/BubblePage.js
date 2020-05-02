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

  const updateColors = (action, editedColor) => {
    if (action === 'EDIT') {
      setColorList(
        colorList.map((color) =>
          color.id === editedColor.id ? editedColor : color
        )
      );
    } else if (action === 'DELETE') {
      setColorList(colorList.filter((color) => color.id !== editedColor));
    } else if (action === 'ADD') {
      setColorList({ editedColor, ...colorList });
    }
  };

  return (
    <>
      <ColorList colors={colorList} updateColors={updateColors} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
