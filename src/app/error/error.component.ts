import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';

@Component({
templateUrl: './error.component.html'
})
export class ErrorComponent{

  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}){

  }
}
