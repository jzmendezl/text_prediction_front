import { useEffect, useState } from 'react'
import './App.css'
import Layout from './components/Layout'

function App() {
  const [text, setText] = useState('')
  const [predictWords, setPredictWords] = useState([])
  const [distribution, setDistribution] = useState(null)
  const [layouts, setLayouts] = useState([])

  useEffect(() => {
    const getLayouts = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/layouts`)
      const res = await response.json()
      setLayouts(res.data?.layouts ?? [])
      if (!distribution) {
        let localDistribution = JSON.parse(localStorage.getItem('distribution'))
        if (!localDistribution) localDistribution = res.data?.layouts[0]
        setDistribution(localDistribution)
      }
    }
    getLayouts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  async function predict(text, layout) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/predict?limit=10`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ text, layout }),
    })

    const res = await response.json()
    return res.data?.prediction ?? []
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      let prediction = await predict(text, distribution?.name)
      setPredictWords(prediction)
    }, 500)

    return () => clearInterval(delayDebounceFn)
  }, [text, distribution])

  const handleSendFeed = async () => {
    let body = JSON.stringify({ text })
    await fetch(`${import.meta.env.VITE_API_URL}/process_text`, {
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

  if(!distribution) return <p>Loading...</p>

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
          {predictWords.slice(0, 3).map(({ probability, word }, index) => (
            <button
              className='btnPredict'
              key={index}
              onClick={() => addWordToText(word)}
            >
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
