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
    console.log('Current dark mode state before toggle:', state.darkMode);
    const newState = {
      ...state,
      darkMode: !state.darkMode,
    };
    console.log('New dark mode state after toggle:', newState.darkMode);
    return newState;
  }),
  on(ThemeActions.setDarkMode, (state) => {
    console.log('Setting dark mode to true');
    return {
      ...state,
      darkMode: true,
    };
  }),
  on(ThemeActions.setLightMode, (state) => {
    console.log('Setting dark mode to false');
    return {
      ...state,
      darkMode: false,
    };
  })
);
