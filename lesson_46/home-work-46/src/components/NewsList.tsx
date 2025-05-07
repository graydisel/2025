import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch} from "../redux/store.ts";
import {getArticles} from "../redux/news/newsSlice.ts"
import {useEffect} from "react";
import {loadingSelector, articlesSelector, errorSelector} from "../redux/selectors.ts";
import {type Article} from "../types/Article.interface.ts";
import "../css/NewsList.css"

export const NewsList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const articles: Article[] = useSelector(articlesSelector);
    const loading: boolean = useSelector(loadingSelector);
    const error = useSelector(errorSelector);

    useEffect(() => {
        dispatch(getArticles());
    }, [dispatch])

    return (
        <div className={'articles-container'}>
            <h2 className={'articles-header'}>Articles</h2>
            {loading && <p className={'loading'}>Loading...</p>}
            {error && <p className={'error'}>Error occurred: {error}</p>}
            <ul className={'articles-list'}>
                {!loading && Array.isArray(articles) && articles.map((article) => (
                    <li key={article.title} className={'article-item'}>
                        <h3 className={'article-header'}>{article.title}</h3>
                        <img className={'article-image'} src={article.urlToImage} alt=""/>
                        <h4>{new Date(article.publishedAt).toLocaleString()}</h4>
                        <p className={'article-content'}>{article.content}</p>
                        <a className={'article-link'} href={article.url} target={"_blank"}>
                            Read more
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}