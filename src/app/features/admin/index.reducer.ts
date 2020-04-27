// import * as fromRoot from '../../core/state/IAppState';
// import * as fromTags from './tag/_state/reducers';
// import * as fromCategory from './category/_state/reducers';
// import {
//   ActionReducerMap,
//   createFeatureSelector,
//   createSelector,
// } from '@ngrx/store';
// import { tagAdapter, TagState } from './tag/_state/reducers';

// export interface AppState extends fromRoot.IAppState {
//   tags: fromTags.TagState;
//   // categories: fromCategory.CategoryState;
// }

// export const reducer: ActionReducerMap<AppState> = {
//   tags: fromTags.tagReducer,
//   // categories : fromCategory.categoryReducer
// };

// export const getAdminState = createFeatureSelector<AppState>('admin');

// // tags state
// export const getAllTags = createSelector(
//   getAdminState,
//   fromTags.getTagsState
// );

// export const getTagsEntities = createSelector(
//   getTagsState,
//   fromTags.getTagsEntities,
// );
// export const getAllTags = createSelector(
//   getAdminState,
//   tagAdapter.getSelectors().selectAll,
// );
// export const getTagsLoading = createSelector(
//   getTagsState,
//   fromTags.getTagsLoading,
// );
// export const getTagsLoaded = createSelector(
//   getTagsState,
//   fromTags.getTagsLoaded,
// );
