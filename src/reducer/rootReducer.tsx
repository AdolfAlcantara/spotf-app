import { combineReducers } from "redux";
import LibraryReducer from "./libraryReducer";

export const rootReducer = combineReducers({library:LibraryReducer});

export type RootState = ReturnType<typeof rootReducer>