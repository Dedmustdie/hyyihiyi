import {Component, OnInit} from '@angular/core';
import {catchError, Observable, tap, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
})
export class RootComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {

  }
}
