import { combineReducers } from "redux";
import LibraryReducer from "./libraryReducer";
import UserReducer from "./userReducer";

export const rootReducer = combineReducers({
    library:LibraryReducer,
    user:UserReducer
});

export type RootState = ReturnType<typeof rootReducer>