import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'prismjs/themes/prism-tomorrow.css'
import Editor from 'react-simple-code-editor'
//import 'prismjs/components/prism-jsx'
import prism from 'prismjs'
import axios from 'axios'
import Markdown from 'react-markdown'
import rehypeHighlight from "rehype-highlight";
function App() {
  const baseurl=import.meta.env.VITE_BASE_URL;
  const [code, setCode] = useState(`//Enter your Code here for review
  `)
  const [review,setReview]=useState(``)
  useEffect(() => {
    prism.highlightAll()
  }, [])

async function  reviewCode(){
  const response=await axios.post(`${baseurl}/ai/get-response`, { code })
  console.log(review.data)
  setReview(response.data )
}

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div className="review" onClick={reviewCode}>
            Review
          </div>
        </div>
        <div className="right">
      <Markdown  rehypePlugins={[ rehypeHighlight ]}>{review}</Markdown>

        </div>
      </main>
    </>
  )
}

export default App
