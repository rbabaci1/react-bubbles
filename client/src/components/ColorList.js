import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

const initialColor = {
  color: '',
  code: { hex: '' },
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const addNewColor = (e) => {
    e.preventDefault();

    // updateColors('ADD', newColor);

    setAdding(false);
  };

  const saveEdit = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        updateColors('EDIT', res.data);
        setEditing(false);
      })
      .catch((err) => console.error(err));
  };

  const deleteColor = (color) => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then((res) => updateColors('DELETE', res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div className='colors-wrap'>
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className='delete'
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                X
              </span>{' '}
              {color.color}
            </span>
            <div
              className='color-box'
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      {/* stretch - build another form here to add a color */}
      <div className='newColor-form'>
        {!editing && !adding && (
          <h3 onClick={() => setAdding(true)}>Add a color</h3>
        )}

        {adding && (
          <div className='newColor-form'>
            <form onSubmit={addNewColor}>
              <label>
                color name:
                <input
                  onChange={(e) => {
                    setNewColor({ ...newColor, color: e.target.value });
                  }}
                  value={newColor.color}
                  type='text'
                  placeholder='...color name'
                />
              </label>

              <label>
                hex code:
                <input
                  onChange={(e) => {
                    setNewColor({ ...newColor, code: { hex: e.target.value } });
                  }}
                  value={newColor.code.hex}
                  type='text'
                  placeholder='...hex code'
                />
              </label>

              <section className='btn-section'>
                <button>Add</button>
              </section>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorList;
