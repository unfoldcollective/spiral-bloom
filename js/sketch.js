// gui params

var opacity = 220;
var opacityMin = 0;
var opacityMax = 255;
var background_hue = 89;
var background_hueMin = 0;
var background_hueMax = 360;
var background_saturation = 50;
var background_saturationMin = 0;
var background_saturationMax = 100;
var background_lightness = 90;
var background_lightnessMin = 0;
var background_lightnessMax = 100;
var hue_exclude_range = 45;
var hue_noise_scale = 100;
var lightness_noise_scale = 50;
var curve_tightness = 1;
var curve_tightnessMin = -10;
var curve_tightnessMax = 10;
var curve_tightnessStep = 0.1;
var seed = 0.0;
var seedDelta = 0.01; // Steps of 0.005-0.03 work best for most applications
var seedDeltaMin = 0.001;
var seedDeltaMax = 0.1;
var seedDeltaStep = 0.001;

var rotation = 0;
var rotationMin = 0;
var rotationMax = 2 * Math.PI;
var rotationStep = 0.01 * Math.PI;
var progress = 0.2;
var progressMin = 0;
var progressMax = 1;
var progressStep = 0.01;

var sepals_amount = 3;
var sepals_amountMin = 3;
var sepals_amountMax = 20;
var sepals_radius = 250;
var sepals_radiusMin = 0;
var sepals_radiusMax = 500;
var sepals_size = 40;
var sepals_sizeMin = 10;
var sepals_sizeMax = 200;
var sepals_c_saturation = 100;
var sepals_c_saturationMin = 0;
var sepals_c_saturationMax = 100;
var sepals_c_lightness = 30;
var sepals_c_lightnessMin = 0;
var sepals_c_lightnessMax = 100;
var sepals_nPoints = 3;
var sepals_nPointsMin = 3;
var sepals_nPointsMax = 10;
var sepals_noiseFactor = 1;
var sepals_noiseFactorMin = 0;
var sepals_noiseFactorMax = 10;
var sepals_noiseFactorStep = 0.1;
var sepals_curve_tightness = 0;
var sepals_curve_tightnessMin = -10;
var sepals_curve_tightnessMax = 10;
var sepals_curve_tightnessStep = 0.1;

var petals_amount = 6;
var petals_amountMin = 3;
var petals_amountMax = 20;
var petals_radius = 150;
var petals_radiusMin = 0;
var petals_radiusMax = 500;
var petals_size = 150;
var petals_sizeMin = 30;
var petals_sizeMax = 200;
var petals_c_saturation = 100;
var petals_c_saturationMin = 0;
var petals_c_saturationMax = 100;
var petals_c_lightness = 70;
var petals_c_lightnessMin = 0;
var petals_c_lightnessMax = 100;
var petals_c2_saturation = 100;
var petals_c2_saturationMin = 0;
var petals_c2_saturationMax = 100;
var petals_c2_lightness = 30;
var petals_c2_lightnessMin = 0;
var petals_c2_lightnessMax = 100;
var petals_nPoints = 5;
var petals_nPointsMin = 3;
var petals_nPointsMax = 10;
var petals_noiseFactor = 2;
var petals_noiseFactorMin = 0;
var petals_noiseFactorMax = 4;
var petals_noiseFactorStep = 0.1;
var petals_curve_tightness = 0;
var petals_curve_tightnessMin = -20;
var petals_curve_tightnessMax = 10;
var petals_curve_tightnessStep = 0.1;

var stamens_amount = 20;
var stamens_amountMin = 3;
var stamens_amountMax = 40;
var stamens_radius = 100;
var stamens_radiusMin = 30;
var stamens_radiusMax = 200;
var stamens_size = 10;
var stamens_c_hue = 10;
var stamens_c_hueMin = 0;
var stamens_c_hueMax = 360;
var stamens_c_saturation = 100;
var stamens_c_saturationMin = 0;
var stamens_c_saturationMax = 100;
var stamens_c_lightness = 90;
var stamens_c_lightnessMin = 0;
var stamens_c_lightnessMax = 100;
var stamens_nPoints = 4;
var stamens_nPointsMin = 3;
var stamens_nPointsMax = 10;
var stamens_noiseFactor = 1;
var stamens_noiseFactorMin = 0;
var stamens_noiseFactorMax = 10;
var stamens_noiseFactorStep = 0.1;
var stamens_curve_tightness = 0;
var stamens_curve_tightnessMin = -10;
var stamens_curve_tightnessMax = 10;
var stamens_curve_tightnessStep = 0.1;

var carpel_amount = 3;
var carpel_amountMin = 3;
var carpel_amountMax = 5;
var carpel_radius;
var carpel_size = 10;
var carpel_sizeMin = 5;
var carpel_sizeMax = 20;
var carpel_c_saturation = 90;
var carpel_c_saturationMin = 0;
var carpel_c_saturationMax = 100;
var carpel_c_lightness = 90;
var carpel_c_lightnessMin = 0;
var carpel_c_lightnessMax = 100;
var carpel_nPoints = 5;
var carpel_nPointsMin = 3;
var carpel_nPointsMax = 10;
var carpel_noiseFactor = 0;
var carpel_noiseFactorMin = 0;
var carpel_noiseFactorMax = 1;
var carpel_noiseFactorStep = 0.1;
var carpel_opacity = 240;
var carpel_curve_tightness = 0;
var carpel_curve_tightnessMin = -10;
var carpel_curve_tightnessMax = 10;
var carpel_curve_tightnessStep = 0.1;

var guiGlobal;
var guiSepals;
var guiPetals;
var guiStamens;
var guiCarpel;
var guis;


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

var a2 = 0.2;
var a2Min = 0;
var a2Max = 10;
var a2Step = 0.1;
var b2 = 0.17;
var b2Min = 0;
var b2Max = 0.2;
var b2Step = 0.001;
var colorLoga = [0, 0, 255];
var minLoga = 0;
var maxLoga = 7 * Math.PI * 2;
var maxLogaStep = 0.01;

var colorData = [0, 255, 0];

var guiArchimedean;
var guiLogarithmic;

var spiral_logarithmic;
var flower_spiral;

var useNoLoop = false;

p5.disableFriendlyErrors = true;


function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    frameRate(30);
    smooth();

    /////////////////
    // flower GUIs //
    /////////////////
    
    guiGlobal  = createGui('Global');
    guiSepals  = createGui('Sepals');
    guiPetals  = createGui('Petals');
    guiCarpel  = createGui('Carpel');
    guiStamens = createGui('Stamens');
    guiLogarithmic  = createGui('Logarithmic');

    guis = [
        guiLogarithmic,
        guiGlobal,
        guiSepals,
        guiPetals,
        guiStamens,
        guiCarpel,
    ]
    
    guiLogarithmic.addGlobals(
        'a2',
        'b2',
        'minLoga',
        'maxLoga',
    );

    guiGlobal.addGlobals(
        'opacity',
        'rotation',
        'progress',
        'background_hue',
        'background_saturation',
        'background_lightness',
        'curve_tightness',
    );
    guiSepals.addGlobals(
        'sepals_amount',
        'sepals_radius',
        'sepals_size',
        'sepals_nPoints',
        'sepals_noiseFactor',
        'sepals_curve_tightness',
    );
    guiPetals.addGlobals(
        'petals_amount',
        'petals_radius',
        'petals_size',
        'petals_nPoints',
        'petals_noiseFactor',
        'petals_curve_tightness',
    );
    guiStamens.addGlobals(
        'stamens_amount',
        'stamens_radius',
        'stamens_size',
        'stamens_nPoints',
        'stamens_noiseFactor',
        'stamens_curve_tightness',
    );
    guiCarpel.addGlobals(
        'carpel_amount',
        // 'carpel_radius',
        'carpel_size',
        'carpel_nPoints',
        // 'carpel_noiseFactor',
        'carpel_curve_tightness',
    );
    
    set_gui_styles('Logarithmic', {"top":"400px"});
    set_gui_styles('Global',  {"left": (width - 200 - 20)  + "px", "top":"400px"});
    set_gui_styles('Stamens', {"left": (width - 200 - 20)  + "px"});
    set_gui_styles('Carpel',  {"left": (width - 200 - 240) + "px"});
    set_gui_styles('Petals',  {"left":"240px"});
    
    // base spiral
    center = createVector(width * 0.5, height * 0.5);
    let baseAngles = _.range(1000).map(function(value) {return value * 0.1});
    spiral_logarithmic = get_spiral_logarithmic(center, baseAngles)
        .filter(function(value, index) {
            if (value.angle >= minLoga && value.angle <= maxLoga ) {
                return value;
            }
        });


    noFill();
    noStroke();
    
    ellipseMode(CENTER);

    // load timeline data
    // $.getJSON("../data/timeline-170503-232226.json", function(json) {
    $.getJSON("../data/sample-9returns.json", function(json) {
    // $.getJSON("../data/sample.json", function(json) {
        // myActivitySpiral = new ActivitySpiral(json);
        jsonInput = json;
        JSONloaded = true;
    });

    // Don't loop automatically
    useNoLoop = true;
    if (useNoLoop) {
        noLoop();
    }
}

function draw() {
    clear();
    background(0);
    
    drawSpiral(spiral_logarithmic, 0, draw_ellipse, false);

    if (JSONloaded && !timelineConstructed) {
        myTimeline = new Timeline(jsonInput);
        console.log("timeline constructed");
        timelineConstructed =  true;
        let timeline_spiral = get_spiral_logarithmic(center, myTimeline.angles);
        flower_spiral = timeline_spiral
            .map(function(value, index, array) {
                let settings = get_global_settings();
                return new Flower(value.position, settings);
            });
        console.log("flower_spiral constructed of length:");
        console.log(flower_spiral.length)
        console.time("first_drawing");
        flower_spiral.map(function(flower) {
            // let globalSettings = get_global_settings();
            // flower.update_settings(globalSettings);
            flower.draw(); 
        });
        console.timeEnd("first_drawing");
    } else if (timelineConstructed) {
        console.time("drawing");
        if (useNoLoop) {
            for (var i = 0; i < 10; i++) {
                flower_spiral.map(function(flower) {
                    // let globalSettings = get_global_settings();
                    // flower.update_settings(globalSettings);
                    flower.draw(); 
                });
            }
        } else {
            flower_spiral.map(function(flower) {
                // let globalSettings = get_global_settings();
                // flower.update_settings(globalSettings);
                flower.draw(); 
            });
        }
        console.timeEnd("drawing");
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
    self.minDate = new Date(lastDate);
    self.minDate.setDate(lastDate.getDate() - 1);
    // self.minDate = new Date(firstDate);

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
}

function get_spiral_logarithmic(center, angles) {
    return angles
        .map(function(value, index, array) {
            // let fadingBlue = [0, 0, map(value, minLoga, maxLoga, 0, 255)];
            let spiral_pos_logarithmic = get_spiral_pos_logarithmic(center, value);
            let spiral_radius_logarithmic = get_spiral_radius_logarithmic(center, value);

            return {
                position: spiral_pos_logarithmic,
                radius: spiral_radius_logarithmic,
                angle: value,
            };
        });
}

function drawSpiral(position_objects, hue, drawing_function, draw_points=true, draw_lines=true) {
    position_objects.map(function(value, index, array) {
        let alpha = map(value.angle, array[0].angle, array[array.length-1].angle, 0, 255);
        let lightness = map(value.angle, array[0].angle, array[array.length-1].angle, 0, 70);
        let point_color = hslaToP5RGBA([hue, 100, lightness, alpha]);
        let line_color = hslaToP5RGBA([hue, 100, 70, alpha]);
        
        if (draw_points) {
            fill(point_color);
            drawing_function(value.position.x, value.position.y, value.radius * 0.8, value.radius * 0.8);
            noFill();
        }

        let position_prev;
        if (index > 0) {
            position_prev = get_spiral_pos_logarithmic(center, array[index-1].angle);
        } else {
            position_prev = center;
        }

        if (draw_lines) {
            stroke(line_color);
            line(
                position_prev.x, position_prev.y,
                value.position.x, value.position.y
            )
            noStroke();            
        }
        return value;
    });
}

function draw_ellipse(x,y,width, height) {
    ellipse(x,y,width, height);
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

function set_gui_styles(title, styles) {
    $( "div.qs_title_bar:contains('"+title+"')" ).parent().css(styles);
}

function hslaToP5RGBA(hslaColor) {
    var rgb = hsluv.hsluvToRgb([hslaColor[0], hslaColor[1], hslaColor[2]]);
    return color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255, hslaColor[3]);
}

function get_global_settings() {
    return {
        'opacity': opacity,
        'background_hue': background_hue,
        'hue_exclude_range': hue_exclude_range,
        'hue_noise_scale': hue_noise_scale,
        'lightness_noise_scale': lightness_noise_scale,
        'curve_tightness': curve_tightness,
        'rotation': rotation,
        'progress': progress,

        'sepals_amount': sepals_amount,
        'sepals_radius': sepals_radius,
        'sepals_size': sepals_size,
        'sepals_c_saturation': sepals_c_saturation,
        'sepals_c_lightness': sepals_c_lightness,
        'sepals_nPoints': sepals_nPoints,
        'sepals_noiseFactor': sepals_noiseFactor,
        'sepals_curve_tightness': sepals_curve_tightness,

        'petals_amount': petals_amount,
        'petals_radius': petals_radius,
        'petals_size': petals_size,
        'petals_c_saturation': petals_c_saturation,
        'petals_c_lightness': petals_c_lightness,
        'petals_c2_saturation': petals_c2_saturation,
        'petals_c2_lightness': petals_c2_lightness,
        'petals_nPoints': petals_nPoints,
        'petals_noiseFactor': petals_noiseFactor,
        'petals_curve_tightness': petals_curve_tightness,

        'stamens_amount': stamens_amount,
        'stamens_radius': stamens_radius,
        'stamens_size': stamens_size,
        'stamens_c_hue': stamens_c_hue,
        'stamens_c_saturation': stamens_c_saturation,
        'stamens_c_lightness': stamens_c_lightness,
        'stamens_nPoints': stamens_nPoints,
        'stamens_noiseFactor': stamens_noiseFactor,
        'stamens_curve_tightness': stamens_curve_tightness,

        'carpel_amount': carpel_amount,
        'carpel_radius': carpel_radius,
        'carpel_size': carpel_size,
        'carpel_c_saturation': carpel_c_saturation,
        'carpel_c_lightness': carpel_c_lightness,
        'carpel_nPoints': carpel_nPoints,
        'carpel_noiseFactor': carpel_noiseFactor,
        'carpel_opacity': carpel_opacity,
        'carpel_curve_tightness': carpel_curve_tightness,
    };
}

// event handlers

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyTyped() {
  if (key === 'g') {
    toggleGUIs();
  }
  // uncomment to prevent any default behavior
  // return false;
}

function toggleGUIs() {
    guis.map(value => value.toggleVisibility() );
}

