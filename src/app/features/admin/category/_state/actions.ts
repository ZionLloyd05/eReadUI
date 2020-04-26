import { Category } from './../../_models/ICategory';
import { Action } from '@ngrx/store';

export enum CategoryActionTypes {
    GET_ALL = '[Category] Get All',
    GET_ALL_COMPLETED = '[Category] Get All Completed',
    GET_ALL_FAILED = '[Category] Get All Failed',
    GET_SINGLE = '[Category] Get Single',
    GET_SINGLE_COMPLETED = '[Category] Get Single Completed',
    GET_SINGLE_FAILED = '[Category] Get Single Failed',
    CREATE = '[Category] Create',
    CREATE_COMPLETED = '[Category] Create Completed',
    CREATE_FAILED = '[Category] Create Failed',
    UPDATE = '[Category] Update',
    UPDATE_COMPLETED = '[Category] Update Completed',
    UPDATE_FAILED = '[Category] Update Failed',
}

export class GetAll implements Action {
    readonly type = CategoryActionTypes.GET_ALL;
}

export class GetAllCompleted implements Action {
    readonly type = CategoryActionTypes.GET_ALL_COMPLETED;
    constructor(public payload: Category[]) {}
}

export class GetAllFailed implements Action {
    readonly type = CategoryActionTypes.GET_ALL_FAILED;
    constructor(public payload: any) {}
}

export class GetSingle implements Action {
    readonly type = CategoryActionTypes.GET_SINGLE;
    constructor(public payload: any) {}
}

export class GetSingleCompleted implements Action {
    readonly type = CategoryActionTypes.GET_SINGLE_COMPLETED;
    constructor(public payload: any) {}
}

export class GetSingleFailed implements Action {
    readonly type = CategoryActionTypes.GET_SINGLE_FAILED;
    constructor(public payload: any) {}
}


export class Create implements Action {
    readonly type = CategoryActionTypes.CREATE;
    constructor(public payload: Category) {}
}

export class CreateCompleted implements Action {
    readonly type = CategoryActionTypes.CREATE_COMPLETED;
    constructor(public payload: any) {}
}

export class CreateFailed implements Action {
    readonly type = CategoryActionTypes.CREATE_FAILED;
    constructor(public payload: any) {}
}

export class Update implements Action {
    readonly type = CategoryActionTypes.UPDATE;
    constructor(public payload: Category) {}
}

export class UpdateCompleted implements Action {
    readonly type = CategoryActionTypes.UPDATE_COMPLETED;
    constructor(public payload: Category) {}
}

export class UpdateFailed implements Action {
    readonly type = CategoryActionTypes.UPDATE_FAILED;
    constructor(public payload: any) {}
}

export type CategoryAction =
GetAll              |
GetAllCompleted     |
GetAllFailed        |
GetSingle           |
GetSingleCompleted  |
GetSingleFailed     |
Create              |
CreateCompleted     |
CreateFailed        |
Update              |
UpdateCompleted     |
UpdateFailed;
