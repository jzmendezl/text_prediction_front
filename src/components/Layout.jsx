import { useEffect, useState } from "react";

function transformKeys(keys) {
  if (keys.length !== 3) return [];
  const newKeys = [];
  keys[1].split("").forEach((key, keyIndex) => {
    if (keyIndex === 4 || keyIndex === 5) return;
    const keyObj = { center: key };
    keyObj.up = keys[0][keyIndex];
    keyObj.down = keys[2][keyIndex];

    if (keyIndex === 3) {
      keyObj.up_right = keys[0][keyIndex + 1];
      keyObj.right = keys[1][keyIndex + 1];
      keyObj.down_right = keys[2][keyIndex + 1];
    }
    if (keyIndex === 6) {
      keyObj.up_left = keys[0][keyIndex - 1];
      keyObj.left = keys[1][keyIndex - 1];
      keyObj.down_left = keys[2][keyIndex - 1];
    }

    newKeys.push(keyObj);
  });
  return newKeys;
}

/**
 * @param {Object} props
 * @param {Object[]} props.keys
 * @param {string} props.name
 * @param {function} props.press
 */
export default function Layout({ keys, name, press }) {
  const [currentKeys, setCurrentKeys] = useState([])

  useEffect(() => {
    setCurrentKeys(transformKeys(keys))
  }, [keys]);

  return (
    <div className='keyboardDist'>
      <p className='titleDist'>{name}</p>
      <div className='keys'>
        {currentKeys.map((key, index) => (
          <button
            className='btnKey'
            key={index}
            onClick={() => press(key.center)}
            value={key.center}
            name='button'
          >
            <div className='grid'>
              <div className='hint'>{key.up_left}</div>
              <div className='hint'>{key.up}</div>
              <div className='hint'>{key.up_right}</div>
              <div className='hint'>{key.left}</div>
              <div className='center'>{key.center}</div>
              <div className='hint'>{key.right}</div>
              <div className='hint'>{key.down_left}</div>
              <div className='hint'>{key.down}</div>
              <div className='hint'>{key.down_right}</div>
            </div>
          </button>
        ))}
      </div>
      <div className='backBtn'>
        <button
          className='btnSpace'
          onClick={() => press(' ')}
          value=' '
          name='button'
        >
          Space
        </button>
        <button
          className='btnSpace'
          onClick={() => press('Backspace')}
          value='Backspace'
          name='button'
        >
          Backspace
        </button>
      </div>
    </div>
  )
}
