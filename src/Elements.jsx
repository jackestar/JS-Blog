import './elements.css'
import './prism.css'
// import '../public/prism'

export let TitleHeader = ({article , banner=''}) => {
    // title,tags,banner=''
    // console.log(tags,tags[1].attributes.title)'#f00'
    const bannerStyle = {
        backgroundColor: article.BannerBG?article.BannerBG:"#f00",
        backgroundImage:'url(' + banner + ')',
    }
    return (
        <div className="headerTitle" style={bannerStyle}>
            <div className="sha">
            <h1>{article.Title}</h1>
            <div className="tags">
            {
            article.tags.data.map( tag => 
                <a key={tag.id} className={tag.attributes.title}>{tag.attributes.title}</a>
            )
            }
            </div>
            </div>
        </div>
        
    )
}

import Markdown from 'markdown-to-jsx'
// import { loadPrism } from '../public/prism'
import React, { useState, useEffect } from "react";

export let MarkdownContent = ({markdown}) => {
    const [contentMD, setcontentMD] = useState(null);
    useEffect(() => {
      fetch(markdown)
        // fetch(`${API_URL}/api/articles?populate=*`)
        .then((response) => response.text())
        .then((data) => setcontentMD(data))
        .catch((error) => console.log(error));
    }, []);
    if (contentMD)
    return (
        <>
            <Markdown className="mark-container">{contentMD}</Markdown>
        </>
    )
    else return (
        <>
            <h1>Loading Markdown</h1>
        </>
    )
}

export let Prism = () => {
    // Reload PrismJS
    let before = document.querySelector('.primss')
    if (before) document.body.removeChild(before)
    
    const script = document.createElement('script');
    script.src = '/prism.js';
    script.classList.add('primss')
    script.async = true;
    document.body.appendChild(script);
    // loadPrism()
    return (
        <>
        </>
    )
}

export let OtherArticles = ({articles,actualArticle}) => {
    // console.log(articles[0].attributes.Title)
    return (
        <section className="otherArticles">
            {articles.filter(a => a.id!=actualArticle).map( article =>
            <a href={article.attributes.Title.replaceAll(' ','_')} key={article.id}>
                <strong>{article.attributes.Title}</strong>
                <p>{article.attributes.Description}</p>
            </a>
            )}
        </section>
    )
}