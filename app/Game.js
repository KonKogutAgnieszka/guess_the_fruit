import { Fruit } from './Fruit.js';
const flowers = ['img/1.png','img/2.png','img/3.png','img/4.png','img/5.png','img/6.png','img/7.png','img/8.png','img/9.png',]
const flower = document.querySelector('.flower')

class Game {
  currentimage = '';
  petal=0;

  fruits=[{
    text:'papaya',
    hint:'came from Mexico',
    img:'img/fr_papaya.png'
  },
  {
    text:'carambola',
    hint:'star fruit',
    img:'img/fr_carambola.png'

  },
  {
    text:'pomegranate',
    hint:'full of red seeds',
    img:'img/fr_pomegranate.png'

  },
  {
    text:'persimmon',
    hint:'looks like orange tomato',
    img:'img/fr_persimmon.png'
  },
  {
    text:'pitaya',
    hint:'fruit of cactus',
    img:'img/fr_dragonfruit.png'
  },
  {
    text:'litchi',
    hint:' symoblises happiness and good fortune',
    img:'img/fr_litchi.png'
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

        const {text, hint, img} = this.fruits[Math.floor(Math.random()*this.fruits.length)]
        this.hintWrapper.innerHTML = hint;
        this.fruit = new Fruit(text);
        this.currentimage = img;
  }

  drawFlower(number){
    
    if(number<flowers.length){
     flower.src=flowers[number];
    }else if(number===flowers.length){
      this.gameOver();
    }
    
  }
  
gameOver(){
  this.hintWrapper.innerHTML = 'game over :(';
  setTimeout(()=>{window.location.reload()},3000);

}

guess(letter,e){
  e.target.disabled= true;
  if(this.fruit.guess(letter)){
  this.drawFruit();
  }
  else if(this.petal<flowers.length){
      this.petal += 1; 
      this.drawFlower(this.petal);
    }
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
  if(!content.includes('_')){
      flower.src = this.currentimage;
    }
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