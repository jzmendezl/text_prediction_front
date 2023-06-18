import { useEffect, useState } from 'react'
import './App.css'
import Layout from './components/Layout'

const layouts = [
  {
    name: 'qwerty',
    homerow: 'asdfjklñ',
    keys: [
      { center: 'a', up: 'q', down: 'z' },
      { center: 's', up: 'w', down: 'x' },
      { center: 'd', up: 'e', down: 'c' },
      {
        center: 'f',
        up: 'r',
        down: 'v',
        up_right: 't',
        right: 'g',
        down_right: 'b',
      },
      {
        center: 'j',
        up: 'u',
        down: 'm',
        up_left: 'y',
        left: 'h',
        down_left: 'n',
      },
      { center: 'k', up: 'i' },
      { center: 'l', up: 'o' },
      { center: 'ñ', up: 'p' },
    ],
  },
  {
    name: 'colemak',
    homerow: 'arstneio',
    keys: [
      { center: 'a', up: 'q', down: 'z' },
      { center: 'r', up: 'w', down: 'x' },
      { center: 's', up: 'f', down: 'c' },
      {
        center: 't',
        up: 'p',
        down: 'v',
        up_right: 'g',
        right: 'd',
        down_right: 'b',
      },
      {
        center: 'n',
        up: 'l',
        down: 'm',
        up_left: 'j',
        left: 'h',
        down_left: 'k',
      },
      { center: 'e', up: 'u' },
      { center: 'i', up: 'y' },
      { center: 'o', up: 'ñ' },
    ],
  },
  {
    name: 'dvorak',
    homerow: 'aoeuhtns',
    keys: [
      { center: 'a', down: 'ñ' },
      { center: 'o', down: 'q' },
      { center: 'e', down: 'j' },
      {
        center: 'u',
        down: 'k',
        up: 'p',
        up_right: 'y',
        right: 'i',
        down_right: 'x',
      },
      {
        center: 'h',
        down: 'm',
        up: 'g',
        up_left: 'f',
        left: 'd',
        down_left: 'b',
      },
      { center: 't', up: 'c', down: 'w' },
      { center: 'n', up: 'r', down: 'v' },
      { center: 's', up: 'l', down: 'z' },
    ],
  },
]

function App() {
  const [text, setText] = useState('')
  const [predictWords, setPredictWords] = useState([])
  // const [feed, setFeed] = useState(false)
  const [distribution, setDistribution] = useState(
    JSON.parse(localStorage.getItem('distribution')) ?? layouts[0]
  )

  async function predict(text, layout) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ text, layout }),
    })

    const res = await response.json()
    return res.prediction
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      let prediction = await predict(text, distribution.name)
      if (prediction.length == 0)
        prediction = await predict('', distribution.name)
      setPredictWords(prediction)
    }, 500)

    return () => clearInterval(delayDebounceFn)
  }, [text, distribution])

  const handleSendFeed = async () => {
    let body = JSON.stringify({ text })
    await fetch(`${import.meta.env.VITE_API_URL}/process-text`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body,
    })

    setText('')
  }

  const press = (letter) => {
    let newText = text
    if (letter === 'Backspace') {
      newText = newText.slice(0, -1)
      setText(newText)
      return
    }
    newText += letter
    setText(newText)
  }

  const addWordToText = (word) => {
    const words = text.split(' ')

    words[words.length - 1] = word
    setText(words.join(' ') + ' ')
  }

  return (
    <>
      <section className='secWriteText'>
        <p className='titleText'>Write Text</p>
        <div className='writeText'>
          <textarea
            name=''
            id='inputText'
            className='areaText'
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <div className='btnDivEnter'>
            <button className='btnEnter' onClick={handleSendFeed}>
              <p>Enter</p>
            </button>
          </div>
        </div>
      </section>

      <section className='secPredictWords'>
        <p className='titleText'>Predict Words</p>
        <div className='predictWords'>
          {predictWords?.slice(0, 3).map(({ probability, word }, index) => (
            <button
              className='btnPredict'
              key={index}
              onClick={() => addWordToText(word)}
            >
              {/* {word + ' ' + probability * 100 + '%'} */}
              {`${word} ${(probability * 100).toFixed(2)}%`}
            </button>
          ))}
        </div>
      </section>

      <section className='secDistribution'>
        <p className='titleText'>Distribution</p>
      </section>

      <section className='secKeyboard'>
        <div className='distributionBoard'>
          <div className='btnKeyboard'>
            <Layout
              keys={distribution.keys}
              name={distribution.name}
              press={press}
            />

            <div className='selectDist'>
              {layouts.map((layout) => (
                <label key={layout.name}>
                  <input
                    type='radio'
                    name='dist'
                    id=''
                    value={layout.name}
                    onClick={() => {
                      setDistribution(layout)
                      localStorage.setItem(
                        'distribution',
                        JSON.stringify(layout)
                      )
                    }}
                    onChange={() => setText('')}
                    checked={distribution.name == layout.name}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
