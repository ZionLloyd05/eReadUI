import { Injectable } from '@angular/core';
import { Tag } from './../../_models/ITag';
import { TagService } from './../../_services/tag.service';
import { Actions, Effect, ofType  } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as tagActions from './actions';

import { Observable, of } from 'rxjs';
import { map, mergeMap, exhaustMap, catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class TagEffect {
    constructor(
        private action$: Actions,
        private tagService: TagService
    ) {}

    @Effect()
    getTags$: Observable<Action> = this.action$
        .pipe(
            ofType<tagActions.GetAll>(
                tagActions.TagActionTypes.GET_ALL
            ),
            mergeMap(() =>
                this.tagService.getTags()
                    .pipe(
                        map((tags: Tag[]) =>
                            new tagActions.GetAllCompleted(tags)
                        ),
                        catchError(err => of(new tagActions.GetAllFailed(err)))
                    )
            )
        );

    @Effect()
    createTag$: Observable<Action> = this.action$
        .pipe(
            ofType<tagActions.Create>(
                tagActions.TagActionTypes.CREATE
            ),
            map((action: tagActions.Create) => action.payload),
            mergeMap((tag: Tag) =>
                this.tagService.createTag(tag)
                    .pipe(
                        map(
                            (newTag: Tag) =>
                                new tagActions.CreateCompleted(newTag)
                        ),
                        catchError(err => of(new tagActions.CreateFailed(err)))
                    )
                )
        );

    @Effect()
    updateTag$: Observable<Action> = this.action$
    .pipe(
        ofType<tagActions.Update>(
            tagActions.TagActionTypes.UPDATE
        ),
        map((action: tagActions.Update) => action.payload),
        mergeMap((tag: Tag) =>
            this.tagService.updateTag(tag)
                .pipe(
                    map(
                        (edittedTag: Tag) =>
                            new tagActions.UpdateCompleted(edittedTag)
                    ),
                    catchError(err => of(new tagActions.UpdateFailed(err)))
                )
            )
    );
}