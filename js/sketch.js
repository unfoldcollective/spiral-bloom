var myActivitySpiral;
var started = false;

var center;

var a1 = 1;
var a1Min = 0;
var a1Max = 100;
var b1 = 1;
var b1Min = 0;
var b1Max = 10;
var b1Step = 0.1;
var colorArch = [255, 0, 0];

var a2 = 1;
var a2Min = 0;
var a2Max = 10;
var a2Step = 0.1;
var b2 = 0.2;
var b2Min = 0;
var b2Max = 1;
var b2Step = 0.01;
var colorLoga = [0, 0, 255]

var guiArchimedean;
var guiLogarithmic;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    frameRate(30);
    smooth();

    center = createVector(width * 0.5, height * 0.5);

    noFill();
    stroke(255);
    ellipseMode(CENTER);

    guiArchimedean  = createGui('Archimedian');
    guiArchimedean.addGlobals(
        'a1',
        'b1',
    );

    guiLogarithmic  = createGui('Logarithmic');
    guiLogarithmic.addGlobals(
        'a2',
        'b2',
    );

    set_gui_styles('Logarithmic', {"left": "240px"});

    // load timeline date
    
    // $.getJSON("../data/timeline-170503-232226.json", function(json) {
    //     myActivitySpiral = new ActivitySpiral(json);
    //     started = true;
    // });
    noStroke();


    // Don't loop automatically
    noLoop();
}

function draw() {
    clear();
    background(0);

    console.log("draw");

    fill(colorArch);
    let spiral_positions_archimedean = _.range(100)
        .map(function(value, index, array) {
            return get_spiral_pos_archimedean(center, value);
        })
        .map(function(value, index, array) {
            ellipse(value.x, value.y, 10, 10);
            return value
        })
        .map(function(value, index, array) {
            stroke(colorArch);
            if (index > 0) {
                line(
                    array[index - 1].x, array[index - 1].y,
                    array[index].x, array[index].y
                )
            }
            noStroke();
            return value
        });
    
    fill(colorLoga);
    let spiral_positions_logarithmic = _.range(100)
        .map(function(value, index, array) {
            return get_spiral_pos_logarithmic(center, value);
        })
        .map(function(value, index, array) {
            ellipse(value.x, value.y, 10, 10);
            return value
        })
        .map(function(value, index, array) {
            stroke(colorLoga);
            if (index > 0) {
                line(
                    array[index - 1].x, array[index - 1].y,
                    array[index].x, array[index].y
                )
            }
            noStroke();
            return value
        });
}

function get_spiral_pos_archimedean(center, angle) {
    return createVector(
        center.x + (a1 + b1 * angle) * Math.cos(angle),
        center.y + (a1 + b1 * angle) * Math.sin(angle)
    );
}

function get_spiral_pos_logarithmic(center, angle) {
    return createVector(
        center.x + a2 * Math.pow(Math.E, b2 * angle) * Math.cos(angle),
        center.y + a2 * Math.pow(Math.E, b2 * angle) * Math.sin(angle)
    )
}

function draw_spiral(positions) {
    positions.map(function(value, index, array) {
        ellipse(value.x, value.y, 20, 20);
        return value;
    });
}

function ActivitySpiral(jsonInput) {
    // sort latest before oldest
    jsonInput.reverse();
    this.jsonInput = jsonInput;
    
    var startOfTimeline = new Date(jsonInput[0]['time_stamp']);
    var endOfTimeline = new Date(jsonInput[jsonInput.length-1]['time_stamp']);

    var positions = [];

    for (var i = 0; i < jsonInput.length; i++) {
        var timeStamp = new Date(jsonInput[i]['time_stamp']);
        
        // var dFromStartOfTimeline = getDFromStartOfTimeline(timeStamp, startOfTimeline);
        // var dFromStartOfDay      = getDFromStartOfDay(timeStamp);

        var dayRatio      = getDayRatio(timeStamp);
        var timelineRatio = getTimelineRatio(timeStamp, startOfTimeline, endOfTimeline);
    
        // console.log(timelineRatio)
        // console.log(dayRatio)

        var position = get_spiral_pos(dayRatio, timelineRatio);
        console.log(position);
        
        positions.push(position);
    }
    this.positions = positions;

    this.draw = function () {
        for (var i = 0; i < this.positions.length; i++) {
            console.log(this.positions[i]['x']);
            ellipse(this.positions[i]['x'], this.positions[i]['y'], 10, 10);
        }
    }
}

function getDayRatio(timeStamp) {
    var millisInDay = 1000 * 60 * 60 * 24;
    var startOfDay = new Date(timeStamp.getFullYear(), timeStamp.getMonth(), timeStamp.getDate() )
    var dFromStartOfDay = timeStamp - startOfDay;
    return dFromStartOfDay / millisInDay;
}

function getTimelineRatio(timeStamp, startOfTimeline, endOfTimeline) {
    var millisInTimeline = endOfTimeline - startOfTimeline;
    var dFromStartOfTimeline = timeStamp - startOfTimeline;
    return dFromStartOfTimeline / millisInTimeline;
}


// function getDFromStartOfDay(timeStamp) {
//     var startOfDay = new Date(timeStamp.getFullYear(), timeStamp.getMonth(), timeStamp.getDate() )
//     return timeStamp - startOfDay;
// }

// function getDFromStartOfTimeline(timeStamp, startOfTimeline) {
//     return timeStamp - startOfTimeline;
// }

function get_spiral_pos(dayRatio, timelineRatio) {
    var angle = dayRatio * TWO_PI;

    var inner = 100;
    var spacing = 8000;

    var xpos = (inner + timelineRatio / spacing) * cos(angle);
    var ypos = (inner + timelineRatio / spacing) * sin(angle);
    
    // return angle;
    return {x: xpos, y: ypos};
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function set_gui_styles(title, styles) {
    $( "div.qs_title_bar:contains('"+title+"')" ).parent().css(styles);
}