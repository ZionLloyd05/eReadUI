import { Tag } from '../../_models/ITag';
import * as fromRoot from '../../../../core/state/IAppState';
import * as fromTag from './actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface TagState extends EntityState<Tag> {
  selectedTagId: number | null;
  isLoading: boolean;
  isLoaded: boolean;
  error: any;
}

export interface AppState extends fromRoot.IAppState {
  tags: TagState;
}

export const tagAdapter: EntityAdapter<Tag> = createEntityAdapter<Tag>();

export const defaultTag: TagState = {
  ids: [],
  entities: {},
  selectedTagId: null,
  isLoading: false,
  isLoaded: false,
  error: null,
};

export const initialState = tagAdapter.getInitialState(defaultTag);

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
      return tagAdapter.addOne(action.payload, {
        ...state,
        selectedCustomerId: action.payload.id,
        isLoaded: true,
        isLoading: false,
      });
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
      return tagAdapter.addAll(action.payload, {
        ...state,
        isLoading: false,
        isLoaded: true,
      });
    }
    case fromTag.TagActionTypes.GET_ALL_FAILED: {
      return {
        ...state,
        entities: {},
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
      return tagAdapter.addOne(action.payload, state);
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
      console.log(action.payload);
      return tagAdapter.updateOne(action.payload, {
        ...state,
        isLoaded: true,
        isLoading: false,
      });
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

const getTagFeatureState = createFeatureSelector<TagState>('tags');

export const getTags = createSelector(
  getTagFeatureState,
  tagAdapter.getSelectors().selectAll,
);
export const getTagsLoading = createSelector(
  getTagFeatureState,
  (state: TagState) => state.isLoading,
);

export const getTagsLoaded = createSelector(
  getTagFeatureState,
  (state: TagState) => state.isLoaded,
);
