import * as fromRoot from '../../core/state/IAppState';
import * as fromTags from './tag/_state/reducers';
import * as fromCategory from './category/_state/reducers';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

export interface AppState extends fromRoot.IAppState {
  tags: fromTags.TagState;
  // categories: fromCategory.CategoryState;
}

export const reducer: ActionReducerMap<AppState> = {
  tags: fromTags.tagReducer,
  // categories : fromCategory.categoryReducer
};

export const getAdminState = createFeatureSelector<AppState>('admin');

// tags state
export const getTagsState = createSelector(
  getAdminState,
  (state: AppState) => state.tags,
);

export const getAllTags = createSelector(getTagsState, fromTags.getTags);
export const getTagsLoading = createSelector(
  getTagsState,
  fromTags.getTagsLoaded,
);
export const getTagsLoaded = createSelector(
  getTagsState,
  fromTags.getTagsLoaded,
);
