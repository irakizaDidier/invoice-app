import { createReducer, on } from '@ngrx/store';
import * as ThemeActions from '../actions/theme.actions';

export interface ThemeState {
  darkMode: boolean;
}

export const initialState: ThemeState = {
  darkMode: false,
};

export const themeReducer = createReducer(
  initialState,
  on(ThemeActions.toggleTheme, (state) => {
    const newState = {
      ...state,
      darkMode: !state.darkMode,
    };
    return newState;
  }),
  on(ThemeActions.setDarkMode, (state) => {
    return {
      ...state,
      darkMode: true,
    };
  }),
  on(ThemeActions.setLightMode, (state) => {
    return {
      ...state,
      darkMode: false,
    };
  })
);
