// code.9leap.net default template
// based on enchant.js v0.7.1

enchant();

window.onload = function(){
    var game = new Core(320, 320);
    game.fps = 15;
    //A.画像の読み込み
    game.preload('map2.png','icon1.png','icon0.png','font0.png','apad.png','pad.png','chara0.png');
    //B.変数の初期化
    game.score = 0;
    
    game.onload = function(){
        //　背景の色を変える
        game.rootScene.backgroundColor = '#afeeee';
        
        //1.物理シミュレーション用の仮想世界を作成する
        var world = new PhysicsWorld(0.0,9.8);
        
        game.rootScene.addEventListener('enterframe',function(){
            world.step(game.fps);
        });
        //2.地面を作成する
        var jimen = new PhyBoxSprite(320,16,
                  enchant.box2d.STATIC_SPRITE,1.0,0.5,0.9,true);
        
        jimen.image = new Surface(16,16);
        jimen.image.draw(game.assets['map2.png'],0,0,16,16,0,0,16,16);
        
        jimen.position = {x: 160,y: 280};
        
        game.rootScene.addChild(jimen);
        
        //3.プレイヤーを作成する
        var ball = new PhyCircleSprite(8,
                  enchant.box2d.DYNAMIC_SPRITE,1.2,0.6,0.9,true);
        
        ball.image = game.assets['icon1.png'];
        ball.frame = 0;
        
        ball.position = {x: 50,y: 260};
        
        ball.addEventListener('touchend',function(){
            ply.frame = 20;
        });
        
        game.rootScene.addChild(ball);
        
        // 蹴る人
        var ply = new PhyCircleSprite(16,
                  enchant.box2d.STATIC_SPRITE,1.2,0.6,0.9,true);
        
        ply.image = game.assets['chara0.png'];
        ply.frame = 19;
        
        ply.position = {x: 25,y: 255};
        
        game.rootScene.addChild(ply);
        
        //4.ドラッグ&ドロップでプレイヤーを発射する
        ball.addEventListener('touchstart',function(e){
            x = e.x;
            y = e.y;
        });
        
        ball.addEventListener('touchend',function(e){
            var vector = new b2Vec2((x - e.x) / 20,(y - e.y) / 20);
            this.applyImpulse(vector);
        });
        //5.7つのブロックを作成する
        //w:横の長さ　h:たての長さ　x:x座標　y:y座標
        blocks = [{w:2,h:1,x:240,y:192}, //1
              {w:1,h:3,x:224,y:176}, //2
              {w:1,h:3,x:272,y:176}, //3
              {w:3,h:1,x:208,y:224}, //4
              {w:3,h:1,x:256,y:224}, //5
              {w:1,h:2,x:208,y:240}, //6
              {w:1,h:2,x:288,y:240}]; //7
              
        for(var i = 0; i  < blocks.length; i++){
            var block = new PhyBoxSprite(16*blocks[i].w,16*blocks[i].h,
                              enchant.box2d.DYNAMIC_SPRITE,0.5,0.5,0.0,false);
            block.image = new Surface(16,16);
            block.image.draw(game.assets['map2.png'],32,0,16,16,0,0,16,16);
            
            
            block.x = blocks[i].x;
            block.y = blocks[i].y;
            
            game.rootScene.addChild(block);
        }
        //6.アイテムを作成する
        var Apple = Class.create(PhyBoxSprite,{
            initialize:function(x,y){
                PhyBoxSprite.call(this,16,16,
                             enchant.box2d.DYNAMIC_SPRITE,1.0,0.8,0.0,false);
                this.image = game.assets['icon0.png'];
                this.frame = 15;
                this.position = {x:x,y:y};
                game.rootScene.addChild(this);
            },
            
            onenterframe:function(){
                
            //7.アイテムが傾いた時に削除する
        if(this.angle < -60 || this.angle > 60){
            
            
            //9.アイテムが傾いた時にスコアをあげる
            game.score += 1;
            scoreLabel.score = game.score;
            
            this.destroy();
        }
        
        
      }
     });
        
        var apple1 = new Apple(234,169);
        var apple2 = new Apple(256,215);
        var apple3 = new Apple(216,216);
        var apple4 = new Apple(296,216);
        var apple5 = new Apple(282,169);
        var apple6 = new Apple(256,257);
        
        //8.スコアを表示する
        var scoreLabel = new ScoreLabel(160,0);
        scoreLabel.score = 0;
        game.rootScene.addChild(scoreLabel);
        
    };
    game.start();
};