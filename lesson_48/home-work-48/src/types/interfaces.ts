import type {ReactElement} from "react";

export interface ArticleInterface {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface RouteInterface {
    title: string;
    path: string;
    element: ReactElement;
    label: string;
}