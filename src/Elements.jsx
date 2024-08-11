import './elements.css'
import './prism.css'
import './prism'

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
import { loadPrism } from './prism'

export let MarkdownContent = ({markdown}) => {
    // console.log(markdown)
    return (
        <>
            <Markdown className="mark-container">{markdown}</Markdown>
        </>
    )
}

export let Prism = () => {
    // Reload PrismJS
    // let before = document.querySelector('.primss')
    // if (before) document.body.removeChild(before)
    
    // const script = document.createElement('script');
    // script.src = '/src/prism.js';
    // script.classList.add('primss')
    // script.async = true;
    // document.body.appendChild(script);
    loadPrism()
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
            <a href='#' key={article.id}>
                <strong>{article.attributes.Title}</strong>
                <p>{article.attributes.Description}</p>
            </a>
            )}
        </section>
    )
}