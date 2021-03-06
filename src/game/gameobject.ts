/**
 * A base game object class
 * 
 * (c) 2018 Jani Nykänen
 */

// Game object class
class GameObject {

    // Position
    protected pos : Vec2;
    // Speed
    protected speed : Vec2;
    // Target speed
    protected target : Vec2;
    // Speed length, "total speed"
    protected totalSpeed : number;
    // Dimensions
    protected dim : Vec2;
    // Center
    protected center : Vec2;

    // Acceleration
    protected acceleration =0.2;

    // Swimming skill
    protected swimmingSkill : number;
    // Does exist
    protected exist : boolean;
    // Is in camera
    protected inCamera : boolean;
    // If take collisions
    protected takeCollision : boolean;
    // Is projectile
    protected projectile : boolean;
    // Does have a key
    protected hasKey : boolean;


    // Constructor
    public constructor(x: number, y: number) {

        this.pos = new Vec2(x, y);
        this.speed = new Vec2();
        this.target = new Vec2();

        this.swimmingSkill = 0;
        this.exist = true;
        this.inCamera = false;
        this.takeCollision = true;
        this.projectile = false;
        this.hasKey = false;

        // Set default dimensions
        this.dim = new Vec2(0, 0);
        this.center = new Vec2(0, 0);
    }


    // Update speed
    private updateSpeed(speed : number, target : number, 
        acc : number, tm : number) : number {
        
        if (speed < target) {
    
            speed += acc * tm;
            if (speed > target) {
    
                speed = target;
            }
        }
        else if (speed > target) {
    
            speed -= acc * tm;
            if (speed < target) {
    
                speed = target;
            }
        }
    
        return speed;
    }


    // Move
    protected move(tm : number) {

        // Update speed
        this.speed.x = this.updateSpeed(this.speed.x, this.target.x, this.acceleration, tm);
        this.speed.y = this.updateSpeed(this.speed.y, this.target.y, this.acceleration, tm);

        // Compute total speed
        this.totalSpeed = Math.sqrt(this.speed.x*this.speed.x 
            + this.speed.y*this.speed.y);

        // Move
        this.pos.x += this.speed.x * tm;
        this.pos.y += this.speed.y * tm;
    }


    // Collision event
    protected collisionEvent?(x : number, y: number, dir : number) : any;
    // Slowing collision
    public getSlowingCollision?(x : number, y : number, 
        w : number, h : number, stairs : boolean) : any;
    // Jump collision
    public getJumpCollision?(x : number, y : number, w : number, h : number, audio?: AudioPlayer) : any;
    // Get hitbox
    public getHitbox?() : Hitbox;
    // Kill
    public kill?() : any;
    // Obtain an item
    public obtainItem?(id : number, x : number, y : number, w : number, h: number, 
        dialogue: Dialogue, audio : AudioPlayer, ass : Assets) : boolean;
    // Lock collection
    public lockCollision?(x : number, y : number, w : number, h : number) : boolean;


    // Wall collision
    public getWallCollision(x : number, y : number, d : number, dir : number, tm : number) {

        if(!this.exist) return;

        const MARGIN1 = 0.0;
        const MARGIN2 = 2.0;

        dir |= 0;

        let cx = this.center.x;
        let cy = this.center.y;
        let px = this.pos.x - cx;
        let py = this.pos.y - cy;
        let w = this.dim.x/2;
        let h = this.dim.y/2;

        let hcheck = px+w >= x && px-w <= x+d;
        let vcheck = py+h > y && py-h < y+d;

        let collided = false;
        switch(dir) {

        // Top
        case 0:

            if(this.speed.y > 0.0 && hcheck && 
               py+h >= y-MARGIN1*tm && py+h <= y+(this.speed.y+MARGIN2)*tm ) {

                this.pos.y = y-h + cy;
                collided = true;
            }
        
            break;

        // Bottom
        case 1:

            if(this.speed.y < 0.0 && hcheck && 
            py-h <= y+MARGIN1*tm && py-h >= y+(this.speed.y-MARGIN2)*tm ) {

                this.pos.y = y+h + cy;
                collided = true;
            }
        
            break;

        // Left
        case 2:

            if(this.speed.x > 0.0 && vcheck && 
               px+w >= x-MARGIN1*tm && px+w <= x+(this.speed.x+MARGIN2)*tm ) {

                this.pos.x = x-w + cx;
                collided = true;
            }
        
            break;

        // Right
        case 3:

            if(this.speed.x < 0.0 && vcheck && 
               px-w <= x+MARGIN1*tm && px-w >= x+(this.speed.x-MARGIN2)*tm ) {

                this.pos.x = x+w + cx;
                collided = true;
            }
        
            break;


        default:
            break;
        }
        
        // Custom collision event
        if(collided && this.collisionEvent != null) {

            this.collisionEvent(x, y, dir);
        }
    }


    // Does exist
    public doesExist() : boolean {

        return this.exist;
    }


    // Get position
    public getPos() : Vec2 {

        return this.pos;
    }


    // Get centered pos
    public getCenteredPos() : Vec2 {

        return new Vec2(this.pos.x-this.center.x,
            this.pos.y-this.center.y);
    }


    // Set position
    public setPos(x : number, y : number) {

        this.pos.x = x;
        this.pos.y = y;
    }


    // Can the object swim
    public getSwimmingSkill() : number {

        return this.swimmingSkill;
    }


    // Is in camera
    public isInCamera() : boolean {

        return this.inCamera;
    }


    // Get total speed
    public getTotalSpeed() : number {

        return this.totalSpeed;
    }


    // Does take collisions
    public doesTakeCollisions() : boolean {

        return this.takeCollision;
    }


    // Is projectile
    public isProjectile() : boolean {

        return this.projectile;
    }


    // Get dimensions
    public getDim() : Vec2 {

        return this.dim;
    }


    // "Destroy"
    public destroy() {

        this.exist = false;
    }


    // Can unlock locks
    public canUnlockLocks() : boolean {

        return this.hasKey;
    }
    
}
