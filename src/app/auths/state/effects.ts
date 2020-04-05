import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import * as authActions from './actions';

import { AuthService } from '../services/auth.service';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';

@Injectable()
export class AuthEffect {
    
}