import { Tag } from '../../_models/ITag';
import * as fromRoot from '../../../../core/state/IAppState';
import * as fromTag from './actions';
import { createFeatureSelector } from '@ngrx/store';

export interface TagState {
  isLoading: boolean;
  isLoaded: boolean;
  tags: Tag[];
  tag: Tag;
  error: any;
}

export const initialState: TagState = {
  isLoading: false,
  isLoaded: false,
  tags: [],
  tag: null,
  error: null,
};

export function tagReducer(
  state = initialState,
  action: fromTag.TagAction,
): TagState {
  switch (action.type) {
    case fromTag.TagActionTypes.GET_SINGLE: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case fromTag.TagActionTypes.GET_SINGLE_COMPLETED: {
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        tag: action.payload,
      };
    }
    case fromTag.TagActionTypes.GET_SINGLE_FAILED: {
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload,
      };
    }
    case fromTag.TagActionTypes.GET_ALL: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case fromTag.TagActionTypes.GET_ALL_COMPLETED: {
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        tags: action.payload,
      };
    }
    case fromTag.TagActionTypes.GET_ALL_FAILED: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        error: action.payload,
      };
    }
    case fromTag.TagActionTypes.CREATE: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case fromTag.TagActionTypes.CREATE_COMPLETED: {
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        tags: state.tags.concat(action.payload),
      };
    }
    case fromTag.TagActionTypes.CREATE_FAILED: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        error: action.payload,
      };
    }
    case fromTag.TagActionTypes.UPDATE: {
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
      };
    }
    case fromTag.TagActionTypes.UPDATE_COMPLETED: {
      const elementIdx = state.tags.findIndex(
        (tag) => tag.id === action.payload.id,
      );

      let newTagsState = [...state.tags];

      newTagsState[elementIdx] = {
        ...newTagsState[elementIdx],
        name: action.payload.name,
        description: action.payload.description,
      };

      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        tags: newTagsState,
      };
    }
    case fromTag.TagActionTypes.UPDATE_FAILED: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export const getTagsLoading = (state: TagState) => state.isLoading;
export const getTagsLoaded = (state: TagState) => state.isLoaded;
export const getTags = (state: TagState) => state.tags;
