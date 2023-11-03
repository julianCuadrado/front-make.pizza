import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-direction',
  templateUrl: './confirm-direction.component.html',
  styleUrls: ['./confirm-direction.component.scss'],
})
export class ConfirmDirectionComponent  implements OnInit {

  @Input() marker: any;

  constructor() { }

  ngOnInit() {}

}
