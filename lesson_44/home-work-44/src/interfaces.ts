import { ReactElement } from "react";


export interface Route {
    title: string;
    path: string;
    element: ReactElement;
    label: string;
}

