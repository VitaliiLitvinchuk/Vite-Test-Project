import React from "react";
import HomePage from "./components/home-page";
import chapters from "./components/chapters";
import { keys, names, paths } from "./components/chapters/constants";

const rootPath = "";

export interface IRouteEndpoint {
    path: string,
    component: React.ElementType | null,
    name: string,
    nested: IRouteEndpoint[] | null
}

const rootRoute: IRouteEndpoint = {
    path: rootPath,
    component: HomePage,
    name: "Vite + react + ts",
    nested: null,
}

export const routes: IRouteEndpoint[] = [
    rootRoute,
    {
        path: `${rootPath}`,
        component: null,
        name: "Chapters",
        nested: paths.map((path, index): IRouteEndpoint => ({
            path: path,
            component: chapters[keys[index]],
            name: names[index],
            nested: null
        })),
    },
];

export default rootPath; 