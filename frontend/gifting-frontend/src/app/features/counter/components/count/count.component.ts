import { Component } from '@angular/core';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent {
  current = 0;

  increment() {
    this.current += 1;
  }

  decrement() {
    this.current -=1;
  }
}
