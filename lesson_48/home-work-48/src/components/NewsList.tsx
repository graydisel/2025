import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch} from "../redux/store.ts";
import {getArticles, switchJournal} from "../redux/news/newsSlice.ts"
import {loadingSelector, articlesSelector, errorSelector, journalsSelector} from "../redux/selectors.ts";
import {type Article} from "../types/Article.interface.ts";
import "../css/NewsList.css"
import {Autocomplete, Stack, TextField} from "@mui/material";
import {type News, newsJournals} from "./newsJournals.ts";
import {useEffect} from "react";


export const NewsList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const articles: Article[] = useSelector(articlesSelector);
    const loading: boolean = useSelector(loadingSelector);
    const error = useSelector(errorSelector);
    const journals = useSelector(journalsSelector)

    useEffect(() => {
        dispatch(getArticles(journals));
    }, [dispatch, journals]);

    const handleJournalsChange = (e, journal: News | null) => {
        if (journal) {
            dispatch(switchJournal(journal.value))
            dispatch(getArticles(journal.value))
            console.log(journals)
        }
    }

    return (
        <>
            <Stack maxWidth="sm" sx={{ my: 4, mx: 'auto', gap: 2}}>
                <h3 style={{textAlign: 'center'}}>Choose the News Journal</h3>
                <Autocomplete
                    disablePortal
                    options={newsJournals}
                    sx={{ width: 300, mx: 'auto'}}
                    renderInput={(params) => <TextField {...params} label="Journals" />}
                    onChange={handleJournalsChange}
                />
            </Stack>
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
        </>
    )
}