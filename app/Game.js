import { Fruit } from './Fruit.js';
const flowers = ['img/1.png','img/2.png','img/3.png','img/4.png','img/5.png','img/6.png','img/7.png','img/8.png','img/9.png',]


class Game {

  petal=0;

  fruits=[{
    text:'papaya',
    hint:'came from Mexico',
    img:'img/fr_papaya.png'
  },
  {
    text:'carambola',
    hint:'star fruit'

  },
  {
    text:'pomegranate',
    hint:'full of red seeds'

  },
  {
    text:'persimmon',
    hint:'looks like orange tomato'

  },
  {
    text:'pitaya',
    hint:'fruit of cactus'

  },
  {
    text:'litchi',
    hint:' symoblises happiness and good fortune'

  },
];

  constructor({
      lettersWrapper,
      hintWrapper,
      wordWrapper,
      outputWrapper
    }) {
        this.lettersWrapper = lettersWrapper;
        this.hintWrapper = hintWrapper;
        this.wordWrapper = wordWrapper;
        this.outputWrapper = outputWrapper;

        const {text, hint} = this.fruits[Math.floor(Math.random()*this.fruits.length)]
        this.hintWrapper.innerHTML = hint;
        this.fruit = new Fruit(text);
  }

  drawFlower(number){
    const flower = document.querySelector('.flower')
    if(number<flowers.length){
     flower.src=flowers[number];
    }else{
      //gameover
    }
    
  }
  

guess(letter,e){
  e.target.disabled= true;
  if(this.fruit.guess(letter)){
  this.drawFruit();
  }
  else{
    
    if(this.petal<flowers.length){
      this.petal += 1; 
      this.drawFlower(this.petal);
      console.log("PUDŁO");
    }else{
      console.log("DEAD") // mechanizm game over dodać i przeładować stronę 
      }
    }
    
 console.log(this.petal)
}

drawLetters(){
  for (let i=0;i<26;i++){
    const label = (i+10).toString(36);
    const button = document.createElement('button');
    button.innerHTML = label;
    button.addEventListener('click',(e)=>this.guess(label,e))
    this.lettersWrapper.appendChild(button);
}
}

drawFruit(){
  const content = this.fruit.getContent();
  this.wordWrapper.innerHTML = content;
}



  start() {
    this.drawLetters();
    this.drawFruit();
    this.drawFlower(this.petal);
  }
}

const game = new Game({
  lettersWrapper: document.getElementById('letters'),
  hintWrapper: document.getElementById('hint'),
  wordWrapper: document.getElementById('word'),
  outputWrapper: document.getElementById('output')
});
game.start();