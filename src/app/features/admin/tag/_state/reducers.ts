
import { Tag } from '../../_models/ITag';
import * as fromRoot from '../../../../core/state/IAppState';
import * as tagActions from './actions';
import { createFeatureSelector } from '@ngrx/store';

export interface TagState {
    isLoading: boolean;
    isLoaded: boolean;
    tags: Tag[];
    tag: Tag;
    error: any;
}

export interface AppState extends fromRoot.IAppState {
    tags: TagState;
}

export const initialState: TagState = {
    isLoading: false,
    isLoaded: false,
    tags: [],
    tag: null,
    error: null
};

export function tagReducer(
    state = initialState,
    action: tagActions.TagAction
): TagState {
    switch (action.type) {
        case tagActions.TagActionTypes.GET_SINGLE: {
            return {
                ...state,
                isLoading: true
            };
        }
        case tagActions.TagActionTypes.GET_SINGLE_COMPLETED: {
            return {
                ...state,
                isLoaded: true,
                isLoading: false,
                tag: action.payload
            };
        }
        case tagActions.TagActionTypes.GET_SINGLE_FAILED: {
            return {
                ...state,
                isLoading: false,
                isLoaded: false,
                error: action.payload
            };
        }
        case tagActions.TagActionTypes.GET_ALL: {
            return {
                ...state,
                isLoading: true
            };
        }
        case tagActions.TagActionTypes.GET_ALL_COMPLETED: {
            return {
                ...state,
                isLoaded: true,
                isLoading: false,
                tags: action.payload
            };
        }
        case tagActions.TagActionTypes.GET_ALL_FAILED: {
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error: action.payload
            };
        }
        case tagActions.TagActionTypes.CREATE: {
            return {
                ...state,
                isLoading: true
            };
        }
        case tagActions.TagActionTypes.CREATE_COMPLETED: {
            return {
                ...state,
                isLoaded: true,
                isLoading: false,
                tags: state.tags.concat(action.payload)
            };
        }
        case tagActions.TagActionTypes.CREATE_FAILED: {
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error: action.payload
            };
        }
        case tagActions.TagActionTypes.UPDATE: {
            return {
                ...state,
                isLoading: true,
                isLoaded: false
            };
        }
        case tagActions.TagActionTypes.UPDATE_COMPLETED: {
            const elementIdx = state.tags
                .findIndex(tag => tag.id === action.payload.id);
            let newTagsState = [...state.tags];
            newTagsState[elementIdx] = {
                    ...newTagsState[elementIdx],
                    name: action.payload.name,
                    description: action.payload.description
                };
            return {
                ...state,
                isLoaded: true,
                isLoading: false,
                tags: newTagsState
            };
        }
        case tagActions.TagActionTypes.UPDATE_FAILED: {
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
