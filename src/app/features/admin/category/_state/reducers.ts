
import { Category } from '../../_models/ICategory';
import * as fromRoot from '../../../../core/state/IAppState';
import * as categoryActions from './actions';
import { createFeatureSelector } from '@ngrx/store';

export interface CategoryState {
    isLoading: boolean;
    isLoaded: boolean;
    categories: Category[];
    category: Category;
    error: any;
}

export const initialState: CategoryState = {
    isLoading: false,
    isLoaded: false,
    categories: [],
    category: null,
    error: null
};

export function categoryReducer(
    state = initialState,
    action: categoryActions.CategoryAction
): CategoryState {
    switch (action.type) {
        case categoryActions.CategoryActionTypes.GET_SINGLE: {
            return {
                ...state,
                isLoading: true
            };
        }
        case categoryActions.CategoryActionTypes.GET_SINGLE_COMPLETED: {
            return {
                ...state,
                isLoaded: true,
                isLoading: false,
                category: action.payload
            };
        }
        case categoryActions.CategoryActionTypes.GET_SINGLE_FAILED: {
            return {
                ...state,
                isLoading: false,
                isLoaded: false,
                error: action.payload
            };
        }
        case categoryActions.CategoryActionTypes.GET_ALL: {
            return {
                ...state,
                isLoading: true
            };
        }
        case categoryActions.CategoryActionTypes.GET_ALL_COMPLETED: {
            return {
                ...state,
                isLoaded: true,
                isLoading: false,
                categories: action.payload
            };
        }
        case categoryActions.CategoryActionTypes.GET_ALL_FAILED: {
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error: action.payload
            };
        }
        case categoryActions.CategoryActionTypes.CREATE: {
            return {
                ...state,
                isLoading: true
            };
        }
        case categoryActions.CategoryActionTypes.CREATE_COMPLETED: {
            return {
                ...state,
                isLoaded: true,
                isLoading: false,
                categories: state.categories.concat(action.payload)
            };
        }
        case categoryActions.CategoryActionTypes.CREATE_FAILED: {
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error: action.payload
            };
        }
        case categoryActions.CategoryActionTypes.UPDATE: {
            return {
                ...state,
                isLoading: true,
                isLoaded: false
            };
        }
        case categoryActions.CategoryActionTypes.UPDATE_COMPLETED: {
            const elementIdx = state.categories
                .findIndex(category => category.id === action.payload.id);
            let newCategorysState = [...state.categories];
            newCategorysState[elementIdx] = {
                    ...newCategorysState[elementIdx],
                    name: action.payload.name,
                    description: action.payload.description
                };
            return {
                ...state,
                isLoaded: true,
                isLoading: false,
                categories: newCategorysState
            };
        }
        case categoryActions.CategoryActionTypes.UPDATE_FAILED: {
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error: action.payload
            };
        }
        default: {
            return state;
        }
    }
}
