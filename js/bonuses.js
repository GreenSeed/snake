
//var o={};
var bonus_coords = [];
function destroyObj(c1, c2,count) {
    return Math.abs(c1.x - c2.x) + Math.abs(c1.y - c2.y) < count;
}
var b_c = ['apple_b', 'apple_g'];
//apple
var Apple;
var score = 0;
var apple_Coords = {};
randomVal_coords(apple_Coords);

var r = 0;
//bonuses
var seconds_from=7000;
var seconds_to=10000;
function c_r_o() {

    bonus_coords[r] = {};
    var p = Math.floor(Math.random() * 2);
      setTimeout(function () {
            moveObj(bonus_coords[r], create_snake_segment(bonus_coords[r], b_c[p]));
            for(var i=0;i<snake_coords.length;i++){
                if(destroyObj(bonus_coords[r],snake_coords[i])){
                    $('#'+bonus_coords[r].id).remove();
                    moveObj(bonus_coords[r], create_snake_segment(bonus_coords[r], b_c[p]));
                }
            }
            for(var i=0;i<bonus_coords.length;i++){
                if(destroyObj(bonus_coords[r],bonus_coords[i])&&i!==r){
                    $('#'+bonus_coords[r].id).remove();
                    moveObj(bonus_coords[r], create_snake_segment(bonus_coords[r], b_c[p]));
                }
            }
            r++;
            c_r_o();
        },
        Math.floor(Math.floor(Math.random()) * seconds_from + Math.floor(Math.random() * seconds_to)));

}
//if(direction!=0) {
c_r_o();
//}