import React from 'react'
import ReactDOM from 'react-dom/client'
import { OtherArticles } from './Elements'
// import './index.css'

ReactDOM.createRoot(document.getElementById('content')).render(
  <React.StrictMode>
    <OtherArticles articles={article.data} actualArticle={article.data[articleNumber].id}></OtherArticles>
    <footer>
        <a href="/">Jackestar 2024</a>
    </footer>
  </React.StrictMode>,
)