import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {GameOperationsService} from "./services/game-operations.service";
import { CanvasComponent } from './canvas/canvas.component';


@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GameOperationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
