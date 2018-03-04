import {Injectable} from '@angular/core';
import {Tile} from "../game/tile";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';


@Injectable()
export class GameOperationsService {

  tiles: Tile[][];

  urls: string[] = [
    '../../assets/nature1.jpg',
    '../../assets/nature2.jpg',
    '../../assets/nature3.jpg',
    '../../assets/nature4.jpg',
    '../../assets/nature5.jpg',
  ];

  canvasEl: HTMLCanvasElement;
  cx: CanvasRenderingContext2D;
  img: HTMLImageElement;
  boardWidth: number = 600;
  tileCount: number = 9;
  tileSize: number = this.boardWidth / this.tileCount;
  solved: boolean = false;
  emptyLoc: Tile = {x: 0, y: 0};
  clickLoc: Tile = {x: 0, y: 0};
  currentUrl: string;


  constructor() {
    this.currentUrl = this.getRandomPic();
  }

  getRandomPic(): string {
    return this.urls[Math.floor(Math.random() * 5)];
  }

  displayImage() {
    this.solved = false;
    this.currentUrl = this.getRandomPic();
    this.img.src = this.currentUrl;
    this.img.onload = () => {
      this.cx.drawImage(this.img, 0, 0);
    };
  }

  shuffle() {
    this.setBoard();
    this.drawTiles();
  }


  setContextAndImage(context: CanvasRenderingContext2D, img: HTMLImageElement, canvasEl: HTMLCanvasElement) {
    this.cx = context;
    this.img = img;
    this.canvasEl = canvasEl;
  }

  setBoard() {
    this.tiles = [];

    for (let i = 0; i < this.tileCount; i++) {
      this.tiles[i] = [];
      for (let j = 0; j < this.tileCount; j++) {
        this.tiles[i][j] = new Tile();
        this.tiles[i][j].x = (this.tileCount - 1) - i;
        this.tiles[i][j].y = (this.tileCount - 1) - j;
      }

    }
    this.emptyLoc.x = this.tiles[this.tileCount - 1][this.tileCount - 1].x;
    this.emptyLoc.y = this.tiles[this.tileCount - 1][this.tileCount - 1].y;
    console.log(this.emptyLoc);
  }

  moveTile() {
    console.log('moveTile');
    if (this.distance(this.clickLoc.x, this.clickLoc.y, this.emptyLoc.x, this.emptyLoc.y) == 1) {
      this.slideTile(this.emptyLoc, this.clickLoc);
      this.drawTiles();
    }
    if (this.solved) {
      alert("You solved it!");
    }
  }

  captureMouse() {
    console.log('captureMouse');
    Observable
      .fromEvent(this.canvasEl, 'mousemove')
      .subscribe((e: MouseEvent) => {
        this.clickLoc.x = Math.floor((e.pageX - this.canvasEl.offsetLeft) / this.tileSize);
        this.clickLoc.y = Math.floor((e.pageY - this.canvasEl.offsetTop) / this.tileSize);
      });
  }

  distance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  drawTiles() {
    this.cx.clearRect(0, 0, this.boardWidth, this.boardWidth);
    for (let i = 0; i < this.tileCount; ++i) {
      for (let j = 0; j < this.tileCount; ++j) {
        let x = this.tiles[i][j].x;
        let y = this.tiles[i][j].y;
        if (i != this.emptyLoc.x || j != this.emptyLoc.y || this.solved == true) {
          this.cx.drawImage(this.img, x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize,
            i * this.tileSize, j * this.tileSize, this.tileSize, this.tileSize);
        }
      }
    }
  }

  slideTile(toLoc, fromLoc) {
    if (!this.solved) {
      this.tiles[toLoc.x][toLoc.y].x = this.tiles[fromLoc.x][fromLoc.y].x;
      this.tiles[toLoc.x][toLoc.y].y = this.tiles[fromLoc.x][fromLoc.y].y;
      this.tiles[fromLoc.x][fromLoc.y].x = this.tileCount - 1;
      this.tiles[fromLoc.x][fromLoc.y].y = this.tileCount - 1;
      toLoc.x = fromLoc.x;
      toLoc.y = fromLoc.y;
      this.checkSolved();
    }
  }

  checkSolved() {
    let flag = true;
    for (let i = 0; i < this.tileCount; ++i) {
      for (let j = 0; j < this.tileCount; ++j) {
        if (this.tiles[i][j].x != i || this.tiles[i][j].y != j) {
          flag = false;
        }
      }
    }
    this.solved = flag;
  }

}
