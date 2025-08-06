import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'prismjs/themes/prism-tomorrow.css'
import Editor from 'react-simple-code-editor'
import prism from 'prismjs'
import axios from 'axios'
import Markdown from 'react-markdown'
import rehypeHighlight from "rehype-highlight";

function App() {
  const baseurl = import.meta.env.VITE_BASE_URL;
  const [code, setCode] = useState(`// Enter your Code here for review
  `)
  const [review, setReview] = useState(``)
  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    const response = await axios.post(`${baseurl}/ai/get-response`, { code })
    setReview(response.data)
  }

  return (
    <>
      <header className="app-header">
        <div className="logo-title">
          
          <span className="title">CodeIQ AI</span>
        </div>
        <nav>
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Docs</a>
          <a href="#" className="nav-link">About</a>
        </nav>
      </header>
      <div className="app-container">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>Navigation</h3>
            <ul>
              <li><a href="#">Code Review</a></li>
              <li><a href="#">History</a></li>
              <li><a href="#">Settings</a></li>
            </ul>
          </div>
        </aside>
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
            <button className="review-btn" onClick={reviewCode}>
              Review Code
            </button>
          </div>
          <div className="right">
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          </div>
        </main>
      </div>
    </>
  )
}

export default App