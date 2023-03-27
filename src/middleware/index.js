import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "./logger";

const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

export const middleware = composeEnhancers(
    applyMiddleware(thunk, logger),
);