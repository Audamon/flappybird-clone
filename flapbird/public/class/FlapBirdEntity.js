
const _GRAVITY = 0.3;
const _TERMINAL_VELOCITY = 100;
const _MAX_UPWARD_VELOCITY = -100;
const _UPWARDS_ACCELERATION = -5;

class FlapBirdEntity{
    constructor(scene){
       this._sprite = scene.add.sprite(50,100, 'bird');
       this._velocity = 0;
    }
    Update(timeElapsed, keys){
        this._ApplyGravity(timeElapsed);
        this._HandleInput(timeElapsed, keys);
        this._velocity = Math.min(Math.max(this._velocity, _MAX_UPWARD_VELOCITY), _TERMINAL_VELOCITY);
        this._sprite.y += this._velocity;
        const v = new Phaser.Math.Vector2(-1 *_TREADMILL_SPEED * timeElapsed, 0);
        v.add(new Phaser.Math.Vector2(0, this._velocity));
        v.normalize();

        const rad = Math.acos(v.dot(new Phaser.Math.Vector2(1,0)));
        const deg = (180.0/Math.PI) * rad;
        this._sprite.angle = deg - 45;
    }

    _ApplyGravity(timeElapsed){
        this._velocity +=  _GRAVITY + timeElapsed;
        
    }
    _HandleInput(timeElapsed, keys){
        if(!Phaser.Input.Keyboard.JustDown(keys.up)){
            return;
        }
        this._velocity =  _UPWARDS_ACCELERATION;
       
    }
    get Bounds(){
       return  this._sprite.getBounds();
    }

    Destroy(){
        this._sprite.destroy();
    }
}