import { SpinnerService } from 'src/app/services/shared/spinner/spinner.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor(public spinnerService: SpinnerService) { }

  ngOnInit(): void {
  }

}
