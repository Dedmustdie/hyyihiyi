import { Component, OnInit } from '@angular/core';
import {ErrorService} from '../../services/error.service'

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html'
})
export class NotfoundComponent implements OnInit {

  constructor(public errorService: ErrorService) { }

  ngOnInit(): void {
  }

}
