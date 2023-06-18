// eslint-disable-next-line react/prop-types
const Qwerty = ({ press }) => {
  return (
    <div className='keyboardDist'>
      <p className='titleDist'>QWERTY</p>
      <div className='keys'>
        <button className='btnKey' onClick={press} value='a' name='button'>
          a
        </button>
        <button className='btnKey' onClick={press} value='s' name='button'>
          s
        </button>
        <button className='btnKey' onClick={press} value='d' name='button'>
          d
        </button>
        <button className='btnKey' onClick={press} value='f' name='button'>
          f
        </button>
        <button className='btnKey' onClick={press} value='j' name='button'>
          j
        </button>
        <button className='btnKey' onClick={press} value='k' name='button'>
          k
        </button>
        <button className='btnKey' onClick={press} value='l' name='button'>
          l
        </button>
        <button className='btnKey' onClick={press} value='ñ' name='button'>
          ñ
        </button>
      </div>
      <div className='backBtn'>
        <button className='btnSpace' onClick={press} value=' ' name='button'>
          Space
        </button>
        <button
          className='btnSpace'
          onClick={press}
          value='Backspace'
          name='button'
        >
          Backspace
        </button>
      </div>
    </div>
  )
}

export default Qwerty
