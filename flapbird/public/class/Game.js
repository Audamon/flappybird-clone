const _CONFIG_WIDTH = 600;
const _CONFIG_HEIGHT = 600;
const _GROUND_Y = _CONFIG_HEIGHT;

class FlapBirdGame {
  constructor() {
    this._game = this._CreateGame();
    this._previousFrame = null;
    this._bird = null;
    this._gameOver = false;
  }
  _CreateGame() {
    const self = this;
    const config = {
      type: Phaser.AUTO,
      width: _CONFIG_WIDTH,
      height: _CONFIG_HEIGHT,
      scene: {
        preload: function () {
          self._OnPreload(this);
        },
        create: function () {
          self._OnCreate(this);
        },
        update: function () {
          self._OnUpdate(this);
        },
      },
    };
    return new Phaser.Game(config);
  }

  _OnPreload(scene) {
    this._scene = scene;
    this._scene.load.image("sky", "assets/sky.png");
    this._scene.load.image("bird", "assets/bird.png");
    this._scene.load.image("pipe", "assets/pipe.png");
    //let a = 0;
  }

  _OnCreate(scene) {
    const s = this._scene.add.image(0, 0, "sky");
    s.displayOriginY = 0;
    s.displayOriginX = 0;
    s.displayWidth = _CONFIG_WIDTH;
    s.displayHeight = _CONFIG_HEIGHT;

    this._bird = new FlapBirdEntity(this._scene);
    this._pipes = [];
    for(let i = 0; i < 4; i+=1){
      this._pipes.push(new PipeEntity(this._scene, 300 + i * 200));
    }
    this._keys = {
      up: this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
    };
  }

  _OnUpdate(scene) {
      if(this._gameOver){
          return;
      }
    const currentFrame = scene.time.now;
    if (this._previousFrame === null) {
      this._previousFrame = currentFrame;
    }

    const timeElapsedInS = (currentFrame - this._previousFrame) / 1000.0;
    this._bird.Update(timeElapsedInS, this._keys);

    this._UpdatePipes(timeElapsedInS);
    this._CheckGameOver();

    this._previousFrame = currentFrame;
  }

  _UpdatePipes(timeElapsed) {
    for (const p of this._pipes) {
      p.Update(timeElapsed);
    }
    if ((this._pipes[0].X + this._pipes[0].Width ) <= 0) {
      const p = this._pipes.shift();
      p.Reset(this._pipes[this._pipes.length - 1].X + 200.0);
      this._pipes.push(p);
     
    }
  }

  _GameOver(){
    const text = 'GAME OVER';
    const style = {font: '80px Arial', fill: '#ffffff', align: 'center'};
   
    this._scene.add.text(0, 0, text, style);
    this._gameOver = true;
  }
  _CheckGameOver(){
    const birdAABB = this._bird.Bounds;
    birdAABB.top += 5;
    birdAABB.left -= 5;
    birdAABB.right -= 3;
    birdAABB.left += 3;

    if(birdAABB.top >= _GROUND_Y){
      this._GameOver();
      return;
    }
    for(const p of this._pipes){
      if(p.Intersects(birdAABB)){
        this._GameOver();
        return;
      }
    }
  }
}
