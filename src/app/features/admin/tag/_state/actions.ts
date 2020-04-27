import { Tag } from './../../_models/ITag';
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

export enum TagActionTypes {
    GET_ALL = '[Tag] Get All',
    GET_ALL_COMPLETED = '[Tag] Get All Completed',
    GET_ALL_FAILED = '[Tag] Get All Failed',
    GET_SINGLE = '[Tag] Get Single',
    GET_SINGLE_COMPLETED = '[Tag] Get Single Completed',
    GET_SINGLE_FAILED = '[Tag] Get Single Failed',
    CREATE = '[Tag] Create',
    CREATE_COMPLETED = '[Tag] Create Completed',
    CREATE_FAILED = '[Tag] Create Failed',
    UPDATE = '[Tag] Update',
    UPDATE_COMPLETED = '[Tag] Update Completed',
    UPDATE_FAILED = '[Tag] Update Failed',
}

export class GetAll implements Action {
    readonly type = TagActionTypes.GET_ALL;
}

export class GetAllCompleted implements Action {
    readonly type = TagActionTypes.GET_ALL_COMPLETED;
    constructor(public payload: Tag[]) {}
}

export class GetAllFailed implements Action {
    readonly type = TagActionTypes.GET_ALL_FAILED;
    constructor(public payload: any) {}
}

export class GetSingle implements Action {
    readonly type = TagActionTypes.GET_SINGLE;
    constructor(public payload: any) {}
}

export class GetSingleCompleted implements Action {
    readonly type = TagActionTypes.GET_SINGLE_COMPLETED;
    constructor(public payload: any) {}
}

export class GetSingleFailed implements Action {
    readonly type = TagActionTypes.GET_SINGLE_FAILED;
    constructor(public payload: any) {}
}


export class Create implements Action {
    readonly type = TagActionTypes.CREATE;
    constructor(public payload: Tag) {}
}

export class CreateCompleted implements Action {
    readonly type = TagActionTypes.CREATE_COMPLETED;
    constructor(public payload: any) {}
}

export class CreateFailed implements Action {
    readonly type = TagActionTypes.CREATE_FAILED;
    constructor(public payload: any) {}
}

export class UpdateTag implements Action {
    readonly type = TagActionTypes.UPDATE;
    constructor(public payload: Tag) {}
}

export class UpdateCompleted implements Action {
    readonly type = TagActionTypes.UPDATE_COMPLETED;
    constructor(public payload: Update<Tag>) {}
}

export class UpdateFailed implements Action {
    readonly type = TagActionTypes.UPDATE_FAILED;
    constructor(public payload: any) {}
}

export type TagAction =
GetAll              |
GetAllCompleted     |
GetAllFailed        |
GetSingle           |
GetSingleCompleted  |
GetSingleFailed     |
Create              |
CreateCompleted     |
CreateFailed        |
UpdateTag              |
UpdateCompleted     |
UpdateFailed;
