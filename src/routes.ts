import React from "react";
import HomePage from "./components/home-page";

const rootPath = "";

export interface IRouteEndpoint {
    path: string,
    component: React.ElementType | null,
    name: string,
    nested: IRouteEndpoint[] | null
}

export const routes: IRouteEndpoint[] = [
    {
        path: rootPath,
        component: HomePage,
        name: "Vite + react + ts",
        nested: null,
    },
    {
        path: `${rootPath}/test-page-1`,
        component: HomePage,
        name: "Vite",
        nested: null,
    },
    {
        path: `${rootPath}/test-page-2`,
        component: null,
        name: "react",
        nested: [
            {
                path: `/test`,
                component: HomePage,
                name: "ts",
                nested: null,
            },
        ]
    },
]

export default rootPath; 