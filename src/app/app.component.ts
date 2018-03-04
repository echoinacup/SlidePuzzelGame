import { Component } from '@angular/core';
import {GameOperationsService} from "./services/game-operations.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';


  constructor(public gameService: GameOperationsService) {

  }

}
