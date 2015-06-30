var snake_size = 102;
var snake_speed = 0.2;
var BORDER = 50;
var STEP_SIZE = 18;
var isReady = false;
var direction = 0;
var last_direction = 'r';
var allow_press={bool:false,time:60};

var $scorebox=$('#score');
var won_score=30;

//for lose
var $lose_w=$('<div id="lose"><img src="img/lose.png"><button value="Restart" id="button_restart" onclick="reset()">Restart</button></div>');
var $refresh_button=$('#button_restart');
$lose_w.css({left: (window.innerWidth - 700) / 2});

//for lose

$(document).ready(setTimeout(function () {
    allow_press.bool=true; //    if quickly move arrows
    isReady = true;
},1000));


var snake_coords = [];
var snake_segment_id = 0;
function moveObj(coords, obj,set) {
    if(!set){
        randomVal_coords(coords);
    }
    obj.css({left: coords.x, top: coords.y});
}
function init_game(){
    init_snake();
    var level_data={count:1,
        maxApples:30,
        needApples:40,
        rocks:[
            //{x:200,y:400},
            //{x:200,y:430},
            //{x:200,y:460},
            //{x:200,y:490},
            //{x:200,y:520},
            //{"x":600,"y":280},
            //{"x":600,"y":250},
            //{"x":600,"y":220},
            //{"x":600,"y":190},
            //{"x":600,"y":310},
            //{"x":600,"y":340},
            //{"x":200,"y":430},
            //{"x":300,"y":440},
            //{"x":600,"y":450},
            //{"x":270,"y":390},
            //{"x":280,"y":330},
            //{"x":240,"y":380},
            //{"x":330,"y":580},
            //{"x":1030,"y":500}
        ]
    };
    //alert("level "+level_data.count);
    won_score=level_data.maxApples;
    for(var i=0;i<level_data.rocks.length;i++){
        moveObj(level_data.rocks[i], create_snake_segment(level_data.rocks[i], "rock-1"),true);
    }
    requestAnimationFrame(move_snake);
}

function end_game(){
    isReady=false;
    setTimeout(function () {
    ShadowContent($lose_w,"show");
    }, 400);
}
function won_game(){
    isReady=false;
    direction=0;
    //alert("You WON!");
}
function reset(){
    for(var i=0;i<snake_coords.length;i++){
        $('#'+snake_coords[i].id).remove();
    }
    for(var i=0;i<bonus_coords.length;i++){
        $('#'+bonus_coords[i].id).remove();
    }
    bonus_coords=[];
    snake_coords=[];
    last_direction='r';
    direction=0;
    ShadowContent($lose_w,"show");
    init_game();
    requestAnimationFrame(move_snake);
    isReady=true;

}
var onkeydown = function (e) {
    if(!allow_press.bool) return;
    if (e.keyCode == 39) {            //right
        if (direction !== 'l') {
            direction = 'r';
        }
    }
    if (e.keyCode == 37) {
        if (direction !== 'r') {       //left
            direction = 'l';
        }
    }
    if (e.keyCode == 38) {
        if (direction !== 'd') {       //up
            direction = 'u';
        }
    }
    if (e.keyCode == 40) {
        if (direction !== 'u') {       //down
            direction = 'd';
        }
    }
    allow_press.bool=false;
    setTimeout(function(){
        allow_press.bool=true;
    },allow_press.time);
};
$(document).keydown(onkeydown);
var randomVal_coords = function (object) {
    object.x = BORDER + Math.floor(Math.random() * ((window.innerWidth - (2 * BORDER)) / STEP_SIZE)) * STEP_SIZE;
    object.y = BORDER + Math.floor(Math.random() * ((window.innerHeight - (2 * BORDER)) / STEP_SIZE)) * STEP_SIZE;
};


function create_snake_segment(coords, clas) {
    var segment = $('<div class="snake_body ' + clas + '"></div>');
    coords.id = 'segm' + snake_segment_id;
    segment.attr('id', coords.id);
    segment.css({left: coords.x, top: coords.y});
    segment.appendTo(document.body);
    snake_segment_id++;
    return segment;
}

function init_snake() {
    var INITIAL_SNAKE_SIZE = 101;
    for (var i = 2; i < INITIAL_SNAKE_SIZE; i++) {
        snake_coords[i] = {x: BORDER + STEP_SIZE / 6 * i, y: BORDER};
        create_snake_segment(snake_coords[i], 'snake_body_rr');
    }
    snake_coords[1] = {x: BORDER + STEP_SIZE / 6, y: BORDER};
    create_snake_segment(snake_coords[1], 'snake_tail_r');
    snake_coords[INITIAL_SNAKE_SIZE] = {x: BORDER + STEP_SIZE / 6 * (INITIAL_SNAKE_SIZE), y: BORDER};
    create_snake_segment(snake_coords[INITIAL_SNAKE_SIZE], 'snake_head_r');
}


var start = 0;
var progress;

var re = 0;
function move_snake(time) {

    re++;
    if (re == 1) {
        start = time;
        requestAnimationFrame(move_snake);
        return;
    }
    progress = time - start;
    start = time;
    requestAnimationFrame(move_snake);


    if (direction == 0 || isReady==false) {
        return;
    }
    if(progress>30){
        progress=15;
    }
    delete window.re;
//    var body = snake_coords[snake_coords.length - 2];
    var oldHead = snake_coords[snake_coords.length - 1];
    var tail1 = snake_coords[1];
    var tail2 = snake_coords[2];

    var newHead = {
        x: oldHead.x,
        y: oldHead.y
    };
    const $2 = $('#' + tail1.id);
    $2.addClass('snake_tail_r');



    function follow_direction(dir, line) {
        if (dir == 'r' || dir == 'd') {
            newHead[line] += parseInt(snake_speed * progress);
        }
        if (dir == 'u' || dir == 'l') {
            newHead[line] -= parseInt(snake_speed * progress);
        }
        create_snake_segment(newHead, 'snake_head_' + dir);

    }


    if (direction == 'd' || direction == 'u') {

        follow_direction(direction, 'y');
    }
    else follow_direction(direction, 'x');
    snake_coords[snake_coords.length] = newHead;

    //if (newHead.y < apple_Coords.y - parseInt(apple_Coords.y / STEP_SIZE) * STEP_SIZE) {
    //    newHead.y = parseInt((window.innerHeight - apple_Coords.y) / STEP_SIZE) * STEP_SIZE + apple_Coords.y;
    //}
    //if (newHead.y > parseInt((window.innerHeight - apple_Coords.y) / STEP_SIZE) * STEP_SIZE + apple_Coords.y) {
    //    newHead.y = apple_Coords.y - parseInt(apple_Coords.y / STEP_SIZE) * STEP_SIZE;
    //}
    //if (newHead.x < apple_Coords.x - parseInt(apple_Coords.x / STEP_SIZE) * STEP_SIZE) {
    //    newHead.x = parseInt((window.innerWidth - apple_Coords.x) / STEP_SIZE) * STEP_SIZE + apple_Coords.x;
    //}
    //if (newHead.x > parseInt((window.innerWidth - apple_Coords.x) / STEP_SIZE) * STEP_SIZE + apple_Coords.x) {
    //    newHead.x = apple_Coords.x - parseInt(apple_Coords.x / STEP_SIZE) * STEP_SIZE;
    //}
    if(newHead.x>window.innerWidth) {
        newHead.x = -7;
    }
    if(newHead.x<-7) {
        newHead.x = window.innerWidth;
    }
    if(newHead.y>window.innerHeight) {
        newHead.y = -7;
    }
    if(newHead.y<-7) {
        newHead.y = window.innerHeight;
    };

    $('#' + oldHead.id).attr('class', 'snake_body snake_body_' + last_direction + direction);

    if (tail2.x < tail1.x && tail2.y == tail1.y) {
        $2.attr('class', 'snake_body snake_tail_l');
    }
    if (tail2.x > tail1.x && tail2.y == tail1.y) {
        $2.attr('class', 'snake_body snake_tail_r');
    }
    if (tail2.y < tail1.y && tail2.x == tail1.x) {
        $2.attr('class', 'snake_body snake_tail_u');
    }
    if (tail2.y > tail1.y && tail2.x == tail1.x) {
        $2.attr('class', 'snake_body snake_tail_d');
    }
    var tail;
    for(var i=1;i<snake_coords.length-20;i++){
        if(destroyObj(snake_coords[i],newHead,15)){
            snake_size=snake_coords.length-i-1;
            for(var q=0;q<i+1;q++){
               deleteObjById(snake_coords[q].id);
            }
            $('#' + snake_coords[0].id).addClass('snake_tail_l');
        }
        if (snake_coords.length > snake_size) {
             tail = snake_coords.shift();
            deleteObjById(tail.id);
        }
    }
    if (snake_coords.length > snake_size) {
        tail = snake_coords.shift();
        deleteObjById(tail.id);

    }
    for (var i = 0; i < bonus_coords.length; i++) {
        if (destroyObj(bonus_coords[i], newHead,30)) {
            var temp = $('#' + bonus_coords[i].id);
            if (temp.hasClass('apple_g')) {
                score++;
                snake_size += 10;
                //moveObj(bonus_coords[i], temp);
                $scorebox.text('Яблоки: '+score);
                //temp.css({left: bonus_coords.x, top: bonus_coords.y});
            }
            if (temp.hasClass('apple_b')) {
                end_game();
            }
            temp.remove();
        }
    }
    last_direction = direction;
    if(score==won_score){ won_game();}
}

init_game();

function ShadowContent(content,action){
    var $shadow=$('<div id="shadow"></div>');
    $shadow.appendTo(document.body);
    if(action=="show"){
        $shadow.animate({
            opacity: 0.5
        }, 1500);
        content.appendTo(document.body);
        content.show();
        content.animate({opacity: 1}, 1500);
    }
    if(action=="close"){
        $shadow.animate({
            opacity:0
        },1500);

        content.animate({opacity:0},1500);
        document.body.removeChild(content);
        document.body.removeChild($shadow);
    }
}
function deleteObjById(id){
    $('#'+id).remove();
}
var Pause=$('<div>PAUSED</div>');
Pause.css({position:'absolute'});
