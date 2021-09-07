import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Actor } from 'src/app/shared/models/actor.model';


@Component({
  selector: 'app-actors-input',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ActorsComponent),
      multi: true
    }
  ]
})
export class ActorsComponent implements OnInit, ControlValueAccessor {

  @Input() validator: AbstractControl;
  @Input() availableActors: Actor[] = [];
  @Input() defaultActors: number[] = [];
  @ViewChild(MatSelect) matSelect: MatSelect;
  @Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  value: string;
  onChange = (_: any) => {};
  onTouch = () => {};
  isDisabled: boolean;
  actorsSelected: Actor[] = [];



  constructor() {}

  ngOnInit(): void {
  }

  selectionChanged(event: MatSelectChange) {
    this.selectionChange.emit(new MatSelectChange(this.matSelect, event.value));
    this.valueChange.emit(event.value);
    this.onChange(event.value);
    this.onTouch();
  }

  writeValue(actor: any): void {
    //this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}
