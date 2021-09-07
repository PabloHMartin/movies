import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-genres-input',
  templateUrl: './genres-input.component.html',
  styleUrls: ['./genres-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenresInputComponent),
      multi: true
    }
  ]
})
export class GenresInputComponent implements OnInit, ControlValueAccessor {

  @Input() validator: AbstractControl;
  @Input() defaultGenres?: string[];

  value: string;
  genresSelected: string[] = [];
  onChange = (_: any) => {};
  onTouch = () => {};
  isDisabled: boolean;
  removable = true;

  constructor() { }

  addGenre(genre: string): void{

    let index = this.genreInArrSelected(genre);

    if(genre.length > 0  && index == -1){
      this.genresSelected.push(genre);
      this.onTouch();
      this.onChange(this.genresSelected);
    }
  }

  removeGenre(genre: string): void{

    let index = this.genreInArrSelected(genre);

    if(index > -1){
      this.genresSelected.splice(index, 1);
      this.onTouch();
      this.onChange(this.value);
    }
  }

  writeValue(genre: string): void {
    if(genre){
      this.value = genre;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }


  genreInArrSelected(genre: string): number {
      return this.genresSelected.indexOf(genre);
  }

  ngOnInit(): void {
    if(this.defaultGenres && this.defaultGenres.length > 0) {
      this.genresSelected = [...this.genresSelected, ...this.defaultGenres];
    }
  }

}
