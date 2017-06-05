var myTimeline;
var JSONloaded = false;
var timelineConstructed = false;
var jsonInput;

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

var a2 = 4;
var a2Min = 0;
var a2Max = 10;
var a2Step = 0.1;
var b2 = 0.1;
var b2Min = 0;
var b2Max = 0.2;
var b2Step = 0.001;
var colorLoga = [0, 0, 255];
var minLoga = 0;
var maxLoga = 7 * Math.PI * 2;

var colorData = [0, 255, 0];

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

    guiLogarithmic  = createGui('Logarithmic');
    guiLogarithmic.addGlobals(
        'a2',
        'b2',
        'minLoga',
        'maxLoga',
    );

    // load timeline data
    $.getJSON("../data/timeline-170503-232226.json", function(json) {
        // myActivitySpiral = new ActivitySpiral(json);
        jsonInput = json;
        JSONloaded = true;
    });
    noStroke();

    // Don't loop automatically
    noLoop();
}

function draw() {
    clear();
    background(0);
    
    let baseAngles = _.range(1000).map(function(value) {return value * 0.1});
    let spiral_positions_logarithmic = get_spiral_logarithmic(baseAngles)
        .filter(function(value, index) {
            if (value.angle >= minLoga && value.angle <= maxLoga ) {
                return value;
            }
        });
    
    drawSpiral(spiral_positions_logarithmic, 0);

    if (JSONloaded && !timelineConstructed) {
        console.log("construct timeline");
        myTimeline = new Timeline(jsonInput);
        timelineConstructed =  true;
    } else if (timelineConstructed) {
        let timeline_positions = get_spiral_logarithmic(myTimeline.angles);
        drawSpiral(timeline_positions, 180);
    }
}

function Timeline(jsonInput) {
    self = this;
    
    // sort oldest before latest
    jsonInput.reverse();
    self.events = jsonInput;
    
    let firstDate = new Date(self.events[0]['time_stamp']);
    let lastDate = new Date(self.events[self.events.length-1]['time_stamp']);

    self.events = self.events
        .map(function(value, index, array) {
            value.date = new Date(value.time_stamp);
            return value
        });

    // TODO: change minDate to be 7 days from NOW, rather than lastDate
    // self.minDate = new Date(lastDate);
    // self.minDate.setDate(lastDate.getDate() - 7);
    self.minDate = new Date(firstDate);

    self.angles = self.events
        // last 7 days
        .filter(function(value, index) {
            if (value.date >= self.minDate ) {
                return value;
            }
        })
        .map(function(value, index, array) {
            return map(value.date, self.minDate.getTime(), lastDate.getTime(), 0, 7 * Math.PI * 2);
        });

    // console.log(self.angles);

    // this.draw = function () {
    //     for (var i = 0; i < this.positions.length; i++) {
    //         console.log(this.positions[i]['x']);
    //         ellipse(this.positions[i]['x'], this.positions[i]['y'], 10, 10);
    //     }
    // }
}

function get_spiral_logarithmic(angles) {
    return angles
        .map(function(value, index, array) {
            // let fadingBlue = [0, 0, map(value, minLoga, maxLoga, 0, 255)];
            let spiral_pos_logarithmic = get_spiral_pos_logarithmic(center, value);
            let spiral_radius_logarithmic = get_spiral_radius_logarithmic(center, value);
            
            let spiral_pos_logarithmic_prev;
            if (index > 0) {
                spiral_pos_logarithmic_prev = get_spiral_pos_logarithmic(center, array[index-1]);
            } else {
                spiral_pos_logarithmic_prev = center;
            }

            return {
                x: spiral_pos_logarithmic.x, 
                y: spiral_pos_logarithmic.y,
                x_prev: spiral_pos_logarithmic_prev.x, 
                y_prev: spiral_pos_logarithmic_prev.y,
                // color: fadingBlue,
                radius: spiral_radius_logarithmic,
                angle: value,
            };
        });
}

function drawSpiral(position_objects, hue) {
    position_objects.map(function(value, index, array) {

        let lightness = map(value.angle, array[0].angle, array[array.length-1].angle, 0, 80);
        let point_color = hslaToP5RGBA([hue, 100, lightness, 255]);

        fill(point_color);
        ellipse(value.x, value.y, value.radius * 0.05, value.radius * 0.05);
        stroke(point_color);
        line(
            value.x_prev, value.y_prev,
            value.x, value.y
        )
        noStroke();
        return value;
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

function get_spiral_radius_logarithmic(center, angle) {
    return a2 * Math.pow(Math.E, b2 * angle);
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

// function get_spiral_pos(dayRatio, timelineRatio) {
//     var angle = dayRatio * TWO_PI;

//     var inner = 100;
//     var spacing = 8000;

//     var xpos = (inner + timelineRatio / spacing) * cos(angle);
//     var ypos = (inner + timelineRatio / spacing) * sin(angle);
    
//     // return angle;
//     return {x: xpos, y: ypos};
// }

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function set_gui_styles(title, styles) {
    $( "div.qs_title_bar:contains('"+title+"')" ).parent().css(styles);
}

function hslaToP5RGBA(hslaColor) {
    var rgb = hsluv.hsluvToRgb([hslaColor[0], hslaColor[1], hslaColor[2]]);
    return color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255, hslaColor[3]);
}