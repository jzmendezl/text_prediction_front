/**
 * @param {Object} props
 * @param {Object[]} props.keys
 * @param {string} props.name
 * @param {function} props.press
 */
export default function Layout({ keys, name, press }) {
  return (
    <div className='keyboardDist'>
      <p className='titleDist'>{name}</p>
      <div className='keys'>
        {keys.map((key, index) => (
          <button
            className='btnKey'
            key={index}
            onClick={() => press(key.center)}
            value={key.center}
            name='button'
          >
            {/* {key} */}
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
