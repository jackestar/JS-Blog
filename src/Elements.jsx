import './elements.css'
import './prism.css'

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

import React, { useState, useEffect, StrictMode } from "react";

// export let MarkdownContent = ({markdown}) => {
//     const [contentMD, setcontentMD] = useState(null);
//     useEffect(() => {
//       fetch(markdown)
//         // fetch(`${API_URL}/api/articles?populate=*`)
//         .then((response) => response.text())
//         .then((data) => setcontentMD(data))
//         .catch((error) => console.log(error));
//     }, []);
//     if (contentMD)
//     return (
//         <>
//             <Markdown className="mark-container">{contentMD}</Markdown>
//         </>
//     )
//     else return (
//         <>
//             <h1>Loading Markdown</h1>
//         </>
//     )
// }
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
// import remarkGfm from "remark-gfm";
// import rehypeKatex from 'rehype-katex';
import rehypeMathjax from 'rehype-mathjax';
import rehypeRaw from 'rehype-raw'

export const MarkdownContent = (props) => {
    console.log(props.children)
    const [contentMD, setcontentMD] = useState(null);
    useEffect(() => {
      fetch(props.children)
        // fetch(`${API_URL}/api/articles?populate=*`)
        .then((response) => response.text())
        .then((data) => setcontentMD(data))
        .catch((error) => console.log(error));
    }, []);
    if (contentMD) {
        // console.log({"children":contentMD})
        return (
            <div className='mark-container'>
                {/* <ReactMarkdown {..._mapProps({"children":contentMD})} /> */}
                <ReactMarkdown children={contentMD}
                remarkPlugins={[
                    remarkMath,
                    // remarkGfm
                ]} 
                // rehypePlugins={[[
                //     rehypeKatex,
                //     {
                //         strict:false,
                //         output:'mathml'
                //     },
                // ],
                // ]}
                rehypePlugins={[
                    [rehypeMathjax],
                    [rehypeRaw]
                ]}
                />
                <Prism></Prism>
            </div>
    )
    }
    else return (
        <div className='LoadingContent'>
            <h1>Loading Markdown</h1>
        </div>
    )
}

export default MarkdownContent;
// export default Markdown;

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