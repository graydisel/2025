import type {ReactElement} from "react";

export interface RouteInterface {
    title: string;
    path: string;
    element: ReactElement;
    label: string;
}