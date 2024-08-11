
const API_URL = ''
const API_JSON = '/articles.json'
// const articleNumber = 0

import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { MarkdownContent, OtherArticles, Prism, TitleHeader } from "./Elements";

let App = () => {
  useEffect(() => {
    if (!window.location.pathname.startsWith('/article/')) {
      window.location.replace('/portfolio.html');
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/portfolio.html" />} /> */}
        <Route path='/article/:articleID' element={<ArticleViewer />}></Route>
      </Routes>
    </Router>
  )
}

function ArticleViewer() {
  const { articleID } = useParams();
  console.log("articleID: ", articleID)
  const [article, setArticle] = useState(null);
  useEffect(() => {
    fetch(API_JSON)
    // fetch(`${API_URL}/api/articles?populate=*`)
      .then((response) => response.json())
      .then((data) => setArticle(data))
      .catch((error) => console.log(error));
  }, []);
  if (article) {
    let articleNumber = article.data.find(a =>
      a.attributes.Title == articleID.replaceAll("_", " ")
    )
    if (articleNumber) articleNumber = articleNumber.id - 1
    else return (
      <h1>What you looking for?</h1>
    )
    console.log(articleNumber)
    let titulo = article.data[articleNumber].attributes.Title
    let tags = article.data[articleNumber].attributes.tags.data
    let markdownRaw = article.data[articleNumber].attributes.Content
    let banner = API_URL + article.data[articleNumber].attributes.Banner.data.attributes.url
    // let markdownRaw = "Raww"
    return (
      <>
        <TitleHeader article={article.data[articleNumber].attributes} banner={banner}>
        </TitleHeader>
        <MarkdownContent markdown={markdownRaw} >
        </MarkdownContent>
        <Prism></Prism>
        <OtherArticles articles={article.data} actualArticle={article.data[articleNumber].id}></OtherArticles>
      </>
    )
  }
  else return (
    <div>
      <h2>Wait</h2>
      <p>Loading...</p>
    </div>
  );
}
export default App;