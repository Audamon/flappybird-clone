const _PIPE_SPACING_Y = 100;
const _TREADMILL_SPEED = -125;

class PipeEntity {
    constructor(scene, x){
        const height = 100 + Math.random() * 400 ;
        this._sprite1 = scene.add.sprite(x, height + _PIPE_SPACING_Y * 0.5, 'pipe');
        this._sprite1.displayOriginX = 0;
        this._sprite1.displayOriginY = 0;

        this._sprite2 = scene.add.sprite(x, height - _PIPE_SPACING_Y * 0.5, 'pipe');
        this._sprite2.displayOriginX = 0;
        this._sprite2.displayOriginY = 0;
        this._sprite2.displayHeight = -1 * this._sprite2.height;
    }

    Update(timeElapsed){
        this._sprite1.x += timeElapsed * _TREADMILL_SPEED;
        this._sprite2.x += timeElapsed * _TREADMILL_SPEED;
    }

    get X(){
        return this._sprite1.x;
    }
    get Width(){
        return this._sprite1.width;
    }

    Destroy(){
        this._sprite1.destroy();
        this._sprite2.destroy();
    }
    Reset(x){
        const height = 100 + Math.random() * 400 ;
        this._sprite1.x = x;
        this._sprite2.x = x;
        this._sprite1.y = height + _PIPE_SPACING_Y * 0.5;
        this._sprite2.y = height - _PIPE_SPACING_Y * 0.5;
    }
    Intersects(bird){
        
        return (Phaser.Geom.Intersects.RectangleToRectangle(this._sprite1.getBounds(), bird) || Phaser.Geom.Intersects.RectangleToRectangle(this._sprite2.getBounds(), bird));
    }
} 