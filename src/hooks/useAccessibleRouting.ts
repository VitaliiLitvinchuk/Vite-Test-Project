import { useEffect } from 'react';
import { useLocation, matchRoutes } from 'react-router-dom';
import rootPath, { routes } from '../routes';

// Flatten the custom routes array into react-router compatible RouteObject format
// to use matchRoutes for title resolving
const getFlattenedRoutes = (routesArray: any[], basePath = ''): any[] => {
    return routesArray.flatMap(route => {
        const fullPath = `${basePath}${route.path}`.replace(/\/\/+/g, '/');
        const currentRoute = { path: fullPath, name: route.name };
        
        if (route.nested && route.nested.length > 0) {
            return [
                currentRoute, 
                ...getFlattenedRoutes(route.nested, fullPath)
            ];
        }
        return [currentRoute];
    });
};

const flatRoutes = getFlattenedRoutes(routes);

export const useAccessibleRouting = () => {
    const location = useLocation();

    useEffect(() => {
        // 1. Resolve page title based on matched route
        const matches = matchRoutes(flatRoutes, location.pathname);
        let pageName = 'Vite App';
        
        if (matches && matches.length > 0) {
            // Get the most specific match
            const bestMatch = matches[matches.length - 1];
            // Access the custom name property we added to our flattened routes
            pageName = (bestMatch.route as any).name || pageName;
        }

        document.title = `${pageName} - Web Accessibility`;

        // 2. Manage focus
        // Wait for DOM to update with requestAnimationFrame or short timeout
        const timeoutId = setTimeout(() => {
            const heading = document.querySelector('h1');
            if (heading) {
                // If the heading is not already focusable, make it focusable programmatically
                if (!heading.hasAttribute('tabindex')) {
                    heading.setAttribute('tabindex', '-1');
                }
                heading.focus();
            } else {
                // Fallback: focus the main layout container if no h1 is found
                const main = document.querySelector('main');
                if (main) {
                    if (!main.hasAttribute('tabindex')) {
                        main.setAttribute('tabindex', '-1');
                    }
                    main.focus();
                }
            }
        }, 100); // 100ms is usually enough for React to render the new route components

        return () => clearTimeout(timeoutId);
    }, [location.pathname]);
};
