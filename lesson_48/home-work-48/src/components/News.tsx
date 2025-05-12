import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch} from "../redux/store.ts";
import {getArticles, switchJournal} from "../redux/news/newsSlice.ts"
import {loadingSelector, articlesSelector, errorSelector, journalsSelector} from "../redux/selectors.ts";
import {type ArticleInterface} from "../types/interfaces.ts";
import "../css/News.css"
import {Autocomplete, CircularProgress, Stack, TextField} from "@mui/material";
import {type NewsInterface, newsJournals} from "./newsJournals.ts";
import {type SyntheticEvent, useEffect} from "react";


export const News = () => {
    const dispatch = useDispatch<AppDispatch>();
    const articles: ArticleInterface[] = useSelector(articlesSelector);
    const loading: boolean = useSelector(loadingSelector);
    const error = useSelector(errorSelector);
    const journals = useSelector(journalsSelector)

    useEffect(() => {
        dispatch(getArticles(journals));
    }, [dispatch, journals]);

    const handleJournalsChange = (e: SyntheticEvent, journal: NewsInterface | null) => {
        if (journal) {
            dispatch(switchJournal(journal.value))
            dispatch(getArticles(journal.value))
            console.log(journals, e)
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
            <div className={'loading'}>
                {loading && <CircularProgress color="inherit" />}
            </div>
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