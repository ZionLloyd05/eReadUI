import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  constructor(public snackBar: MatSnackBar) {
  }

  config: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    };

  confirm(message: string, okCallback: () => any) {
  }

  success(message: string) {
    this.config.panelClass = ['notification', 'success'];
    this.snackBar.open(message, 'X', this.config);
  }

  error(message: string) {
    this.snackBar.open(message, 'Error');
  }

  warning(message: string) {
    this.snackBar.open(message, 'Warning');
  }

  message(message: string) {
    this.snackBar.open(message, 'Message');
  }
}
