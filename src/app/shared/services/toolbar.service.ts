import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  initialToolbar: string = 'pruebatecnica';

  private _toolbar: BehaviorSubject<string> = new BehaviorSubject(<string>(this.initialToolbar));
  toolbar$: Observable<string> = this._toolbar.asObservable();

  constructor() { }

  setToolbarTitle(title: string): void{
    this._toolbar.next(title);
  }
}
