var myActivitySpiral;
var started = false;

var center;

var a1 = 1;
var a1Min = 0;
var a1Max = 100;
var b1 = 3;
var b1Min = 0;
var b1Max = 10;
var b1Step = 0.1;
var colorArch = [255, 0, 0];
var minArch = 0;
var maxArch = 100;

var a2 = 0.1;
var a2Min = 0;
var a2Max = 10;
var a2Step = 0.1;
var b2 = 0.08;
var b2Min = 0;
var b2Max = 0.1;
var b2Step = 0.001;
var colorLoga = [0, 0, 255];
var minLoga = 54;
var maxLoga = 100;

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
        'minArch',
        'maxArch',
    );

    guiLogarithmic  = createGui('Logarithmic');
    guiLogarithmic.addGlobals(
        'a2',
        'b2',
        'minLoga',
        'maxLoga',
    );

    set_gui_styles('Logarithmic', {"top": "260px"});

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

    let spiral_positions_archimedean = _.range(100)
        .filter(function(value, index) {
            if (value >= minArch && value <= maxArch ) {
                return value;
            }
        })
        .map(function(value, index, array) {
            let fadingRed = [map(value, minArch, maxArch, 0, 255),0,0];
            fill(fadingRed);
            let spiral_pos_archimedean = get_spiral_pos_archimedean(center, value);
            ellipse(spiral_pos_archimedean.x, spiral_pos_archimedean.y, 10, 10);
            
            // lines
            stroke(fadingRed);
            if (index > 0) {
                let spiral_pos_archimedean_prev = get_spiral_pos_archimedean(center, array[index-1]);
                line(
                    spiral_pos_archimedean_prev.x, spiral_pos_archimedean_prev.y,
                    spiral_pos_archimedean.x, spiral_pos_archimedean.y
                )
            }
            noStroke();
            return spiral_pos_archimedean;
        })
    
    fill(colorLoga);
    let spiral_positions_logarithmic = _.range(100)
        .filter(function(value, index) {
            if (value >= minLoga && value <= maxLoga ) {
                return value;
            }
        })
        .map(function(value, index, array) {
            let fadingBlue = [0, 0, map(value, minLoga, maxLoga, 0, 255)];
            fill(fadingBlue);
            let spiral_pos_logarithmic = get_spiral_pos_logarithmic(center, value);
            ellipse(spiral_pos_logarithmic.x, spiral_pos_logarithmic.y, 10, 10);
            
            // lines
            stroke(fadingBlue);
            if (index > 0) {
                let spiral_pos_logarithmic_prev = get_spiral_pos_logarithmic(center, array[index-1]);
                line(
                    spiral_pos_logarithmic_prev.x, spiral_pos_logarithmic_prev.y,
                    spiral_pos_logarithmic.x, spiral_pos_logarithmic.y
                )
            }
            noStroke();
            return spiral_pos_logarithmic;
        })

    if (JSONloaded) {
        console.log(jsonInput);
        // jsonInput.map(function(value, index, array) {
        //     return 
        // });
    }
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