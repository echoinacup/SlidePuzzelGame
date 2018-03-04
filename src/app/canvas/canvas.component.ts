import {AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GameOperationsService} from "../services/game-operations.service";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterContentInit {

  @ViewChild('canvas') public canvas: ElementRef;

  canvasEl: HTMLCanvasElement;
  cx: CanvasRenderingContext2D;
  image: HTMLImageElement;

  imgWidth = 600;
  imgHeight = 600;

  constructor(public gameOperationsService: GameOperationsService) {
    this.image = new Image();
    this.image.src = this.gameOperationsService.currentUrl;
    this.gameOperationsService.setBoard();
  }

  ngAfterContentInit(): void {
    this.canvasEl = this.canvas.nativeElement;
    this.canvasEl.width = this.imgWidth;
    this.canvasEl.height = this.imgHeight;
    this.cx = this.canvasEl.getContext('2d');
    this.gameOperationsService.setContextAndImage(this.cx, this.image, this.canvasEl);
    this.gameOperationsService.displayImage();
    this.gameOperationsService.captureMouse();
  }

}
