import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
  isEdit: boolean;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  isEdit: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.isEdit = data.isEdit;
  }

  ngOnInit(): void {
  }

}
