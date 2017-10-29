import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  greenSts: boolean = false;
  redSts: boolean = false;
  blueSts: boolean = false;
  yellowSts: boolean = false;
  arr: number[] = [];
  arrH: number[] = [];
  contador: any = "--";
  strict: boolean = false;
  flagError = false;
  flagBegin = false;
  procesoBool = false;
  boolStatus: boolean = false;
  flagWin:boolean = false;

  constructor() {
    // console.log("Entrando al constructor")
    // // this.proceso([0, 1, 2, 3])
    // this.addPC()
  }

  proceso(array) {
    this.procesoBool = true;
    var _this = this;
    for (let i: number = 0; i < array.length; i++) {
      setTimeout(function() {
        if (array[i] == 0) {
          _this.illGreen();
        } else if (array[i] == 1) {
          _this.illRed();
        } else if (array[i] == 2) {
          _this.illYellow();
        } else if (array[i] == 3) {
          _this.illBlue();
        }

        if ((i + 1) == array.length) {

          _this.procesoBool = false
        }
      }, (i + 1) * 1000);

    }

  }

  illGreen() {
    this.greenSts = true;
    var audio = new Audio();
    audio.src = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
    audio.load();
    audio.play();
    let promesa = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.greenSts = false;
        resolve(true);
      }, 500);
    })
    return promesa
  }
  illRed() {
    this.redSts = true;
    var audio = new Audio();
    audio.src = "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
    audio.load();
    audio.play();
    let promesa = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.redSts = false;
        resolve(true);
      }, 500);
    })
    return promesa
  }
  illBlue() {
    this.blueSts = true;
    var audio = new Audio();
    audio.src = "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
    audio.load();
    audio.play();
    let promesa = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.blueSts = false;
        resolve(true);
      }, 500);
    })
    return promesa
  }
  illYellow() {
    this.yellowSts = true;
    var audio = new Audio();
    audio.src = "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";
    audio.load();
    audio.play();
    let promesa = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.yellowSts = false;
        resolve(true);
      }, 500);
    })
    return promesa
  }

  addPC() {
    let number = Math.round(Math.random() * 3)
    this.arr.push(number)
    this.proceso(this.arr)
    this.arrH = []

  }

  addHuman(num: number) {
    this.arrH.push(num)
    if (this.arrH.length == this.arr.length) {

      //Hemos acertado
      if (this.compare(this.arr, this.arrH)) {
        this.contador += 1;
        this.addPC()

        //Cuando ganamos
        if(this.contador == 20){
          this.flagWin = true;
          this.on()
        }
      }//Nos hemos equivocado
      else {
        //modo no estricto
        if (!this.strict) {
          this.arrH = []
          this.proceso(this.arr)
        }//modo estricto
        else {
          this.contador = "!!"
          this.flagError = true;
          setTimeout(() => {
            this.arrH = []
            this.arr = []
            this.contador = 0
            this.flagError = false;

            this.addPC()


          }, 3000)
        }
      }
    }

  }

  compare(arr, arrH) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] != arrH[i]) {
        return false
      }
    }
    return true;
  }

  on() {
    this.arrH = []
    this.arr = []
    this.flagBegin = true;
    this.addPC();
    this.proceso(this.arr)
    this.contador = 0
    setTimeout(()=>{
      this.flagWin = false;
    },2000)
  }

  off() {
    this.flagBegin = false;
    this.contador = "--"
    this.arrH = []
    this.arr = []

  }

}
