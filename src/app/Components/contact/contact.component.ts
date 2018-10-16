import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  @Output() toggleAbout = new EventEmitter<string>();

  callParent() {
    this.toggleAbout.next();
  }

  ngOnInit() {

  }

}
