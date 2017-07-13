var useNoLoop = false;
var useTiming = false;
var useNoLoop = true;
// var useTiming = true;

var timelinePath = "../scraping/data/timeline.json";
var a2 = 0.01;
var b2 = 0.245;
var minLoga = 4 * Math.PI * 2;
var maxLoga = 7 * Math.PI * 2;
var lastNdays = 3 * 1/24;
var recency_threshold = 0.4;
var everyNminutes = 15;
var progress_delta = 0.01;

// gui params
var opacity = 220;
var opacityMin = 0;
var opacityMax = 255;
// var background_hue = 89;
var background_hue = 30;
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
var noiseFactor = 1;
var curve_tightness = 1;
var curve_tightnessMin = -10;
var curve_tightnessMax = 10;
var curve_tightnessStep = 0.1;
var seed = 0.0;
var seedDelta = 0.03; // Steps of 0.005-0.03 work best for most applications
var seedDeltaMin = 0.001;
var seedDeltaMax = 0.1;
var seedDeltaStep = 0.001;
var spiral_hue = background_hue;
var spiral_saturation = background_saturation;
var spiral_lightness = 30;

var rotation = 0;
var rotationMin = 0;
var rotationMax = 2 * Math.PI;
var rotationStep = 0.01 * Math.PI;
var progress = 1;
var progressMin = 0;
var progressMax = 1;
var progressStep = 0.01;

var sepals_amount = 3;
var sepals_amountMin = 3;
var sepals_amountMax = 20;
var sepals_radius = 250;
var sepals_radiusMin = 10;
var sepals_radiusMax = 350;
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
var sepals_growth_b = 5;
var sepals_growth_c = 7;

var petals_amount = 6;
var petals_amountMin = 3;
var petals_amountMax = 20;
var petals_radius = 150;
var petals_radiusMin = 0;
var petals_radiusMax = 400;
var petals_size = 150;
var petals_sizeMin = 30;
var petals_sizeMax = 200;
var petals_c_saturation = 100;
var petals_c_saturationMin = 0;
var petals_c_saturationMax = 100;
var petals_c_lightness = 80;
var petals_c_lightnessMin = 0;
var petals_c_lightnessMax = 100;
var petals_nPoints = 5;
var petals_nPointsMin = 3;
var petals_nPointsMax = 10;
var petals_noiseFactor = 2;
var petals_noiseFactorMin = 0;
var petals_noiseFactorMax = 4;
var petals_noiseFactorStep = 0.1;
var petals_growth_b = 5;
var petals_growth_c = 5;

var stamens_amount = 20;
var stamens_amountMin = 3;
var stamens_amountMax = 20;
var stamens_radius = 100;
var stamens_radiusMin = 50;
var stamens_radiusMax = 300;
var stamens_size = 10;
var stamens_sizeMin = 10;
var stamens_sizeMax = 20;
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
var stamens_growth_b = 20;
var stamens_growth_c = 5;

var carpel_amount = 3;
var carpel_amountMin = 3;
var carpel_amountMax = 5;
var carpel_size = 10;
var carpel_sizeMin = 5;
var carpel_sizeMax = 20;
var carpel_radius = carpel_size;
var carpel_radiusMin = carpel_sizeMin;
var carpel_radiusMax = carpel_sizeMax;
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
var carpel_growth_b = 5;
var carpel_growth_c = 7;
var carpel_opacity = 240;

var guis;
var guiLogarithmic;

var myTimeline;
var myFeed;
var timelineConstructed = false;

var center;
var origin;


var spiral_logarithmic;
var flower_spiral;
var maxRadius;

p5.disableFriendlyErrors = true;


function setup() {
    createCanvas(windowWidth, windowHeight);
    background(hsluvToP5Rgb(background_hue, background_saturation, background_lightness));
    frameRate(10);
    smooth();

    /////////////////
    // GUIs //
    /////////////////
    
    guiLogarithmic  = createGui('Logarithmic');

    guis = [
        guiLogarithmic,
    ]
    
    guiLogarithmic.addGlobals(
        'a2',
        'b2',
        'minLoga',
        'maxLoga',
    );
    
    set_gui_styles('Logarithmic', {"top":"400px"});

    toggleGUIs();
    
    // base spiral
    center = createVector(width * 0.5, height * 0.5);
    origin = createVector(0, 0);
    let baseAngles = _.range(1000).map(function(value) {return value * 0.1});
    spiral_logarithmic = get_spiral_logarithmic(origin, baseAngles)
        .filter(function(value, index) {
            if (value.angle >= minLoga && value.angle <= (maxLoga + 0.01 * Math.PI) ) {
                return value;
            }
        });


    noFill();
    noStroke();
    
    ellipseMode(CENTER);
    
    check_for_updates_timeline();
    setInterval(check_for_updates_timeline, everyNminutes * 60 * 1000);

    // Don't loop automatically
    if (useNoLoop) {
        noLoop();
    }
}

function onJsonLoaded(json) {
    if (timelineConstructed) {
        // update existing timeline
        myTimeline.update(json);
        calc_flower_spiral();
        myFeed.update(json);
    }
    else {
        // init new timeline
        initTimeline(json);
        initFeed(json);
    }
}

function initFeed(jsonInput) {
    myFeed = new Feed(jsonInput);
}

function initTimeline(jsonInput) {
    myTimeline = new Timeline(jsonInput);
    timelineConstructed =  true;
    calc_flower_spiral();
}

function calc_flower_spiral() {
    let timeline_angles = 
        myTimeline.events
        .map(function(event) {
            return event.angle + minLoga
        });
    let timeline_spiral = get_spiral_logarithmic(origin, timeline_angles);
    maxRadius = get_spiral_radius_logarithmic(origin, _.max(timeline_angles));
    
    flower_spiral = timeline_spiral
        .map(function(value, index, array) {
            let radiusRatio = value.radius / maxRadius;
            let angleRatio = value.angle / (maxLoga - minLoga);
            let settings = map_return_to_flower_settings(myTimeline.get_event(index), angleRatio, radiusRatio);
            return new Flower(value.position, settings);
        });
    console.log("flower_spiral constructed of length:", flower_spiral.length);
}

function draw() {
    clear();
    // background(hsluvToP5Rgb(background_hue, background_saturation, background_lightness));
    
    if (timelineConstructed) {
        push();
            translate(center.x, center.y);
            rotate( millis() / (15 * 60 * 1000) * 2 * Math.PI );
            drawSpiral(spiral_logarithmic, spiral_hue, draw_ellipse, false);
            drawFlowers();
        pop();
    }

}

function check_for_updates_timeline() {
    console.log("check_for_updates_timeline");
    $.getJSON(timelinePath, function(json) {
        onJsonLoaded(json);
    });
}

function drawFlowers() {
    if (useTiming) {
        console.time("flower.draw");
    }
    flower_spiral.map(function(flower) {
        flower.update();
        flower.draw(); 
    })
    if (useTiming) {
        console.timeEnd("flower.draw");
    }
}

function Timeline(jsonInput) {
    let self = this;
    self.min_length = 3;
    self.max_length = 30;
    self.init = function (jsonInput) {
        self.inputs = jsonInput;
        self.calc_events();
        console.log("loaded inputs from JSON: ", self.inputs.length)
    }
    self.calc_events = function () {
        let lastDate = new Date(self.inputs[0].time_stamp);
        let minDate = new Date(lastDate);
        minDate.setDate(lastDate.getDate() - lastNdays);
        let logaDelta = maxLoga - minLoga;
        self.events = 
            self.inputs
            // turn timestamps into JS dates
            .map(function(input, index, array) {
                return _.set(input, 'date', new Date(input.time_stamp))
            })
            // add angle between 0 and N * 2 PI
            .map(function(input, index, array) {
                return _.set(input, 'angle', map(input.date.getTime(), minDate.getTime(), lastDate.getTime(), 0, logaDelta))
            });

        // filter to have not too much AND not too little
        let filteredEvents = self.events
            // filter last N days
            .filter(function(event, index) {
                if (event.date >= minDate ) {
                    return event;
                }
            })
        if (filteredEvents.length < self.min_length) {
            filteredEvents = _.slice(self.events, 0, self.min_length);
        }
        else if (filteredEvents.length > self.max_length) {
            filteredEvents = _.slice(self.events, 0, self.max_length);
        }
        self.events = filteredEvents;
    };


    self.update = function (jsonInput) {
        console.log('Timeline.update()')
        self.inputs = jsonInput;
        self.calc_events();
    };
    self.get_angle = function (index) {
        return self.events[index].angle;
    };
    self.get_event = function (index) {
        return self.events[index];
    };

    self.init(jsonInput);
}

function get_spiral_logarithmic(center, angles) {
    return angles
        .map(function(value, index, array) {
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
    position_objects.map(function(spiral_point, index, array) {
        let angleRatio  = spiral_point.angle / (maxLoga - minLoga);
        let radiusRatio = spiral_point.radius / maxRadius;
        let saturation  = spiral_saturation;
        let lightness   = spiral_lightness;
        let alpha       = radiusRatio * 255;
        let strokeW     = radiusRatio * 3;
        
        let point_color = hslaToP5RGBA([hue, 100       , lightness, alpha]);
        let line_color  = hslaToP5RGBA([hue, saturation, lightness, alpha]);
        
        if (draw_points) {
            fill(point_color);
            drawing_function(spiral_point.position.x, spiral_point.position.y, spiral_point.radius * 0.8, spiral_point.radius * 0.8);
            noFill();
        }

        let position_prev;
        if (index > 0) {
            position_prev = array[index-1].position;
        } else {
            position_prev = spiral_point.position;
        }

        if (draw_lines) {
            strokeWeight(strokeW);
            stroke(line_color);
            line(
                position_prev.x, position_prev.y,
                spiral_point.position.x, spiral_point.position.y
            )
            strokeWeight(1);
            // noStroke();    
        }
        return spiral_point;
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

function map_return_to_flower_settings(returnedItem, angleRatio, radiusRatio) {
    // returnedItem: all scraped data attrs
    // angleRatio: angle along spiral (increases linearly {0,1})
    // radiusRatio: ratio of item radius to max radius (increases logarithmically {0,1})
    mapped_settings =  {
        'opacity': opacity,
        'background_hue': background_hue,
        'hue_exclude_range': hue_exclude_range,
        'hue_noise_scale': hue_noise_scale,
        'lightness_noise_scale': lightness_noise_scale,
        'curve_tightness': returnedItem['years_ago'],
        'noiseFactor': noiseFactor,
        'rotation': _.random(0,360),
        'progress': 0,
        'recency': radiusRatio,
        'progress_delta': progress_delta,
        'recency_threshold': recency_threshold,

        'sepals_amount': 2 + returnedItem['publisher_n_words'] || sepals_amountMin,
        'sepals_radius': map(returnedItem['publisher_length'], 0, 30, sepals_radiusMin, sepals_radiusMax) || sepals_radiusMin,
        'sepals_size': map(returnedItem['publisher_avg_word_length'], 3, 12, sepals_sizeMin, sepals_sizeMax) || sepals_sizeMin,
        'sepals_noiseFactor': returnedItem['in_stock_since_years_ago'],
        'sepals_c_saturation': sepals_c_saturation,
        'sepals_c_lightness': sepals_c_lightness,
        'sepals_nPoints': sepals_nPoints,
        'sepals_growth_b': sepals_growth_b,
        'sepals_growth_c': sepals_growth_c,

        'petals_amount': 2 + returnedItem['title_n_words'] || petals_amountMin,
        'petals_radius': map(returnedItem['title_length'], 2, 60, petals_radiusMin, petals_radiusMax) || petals_radiusMin,
        'petals_size': map(returnedItem['title_avg_word_length'], 2, 15, petals_sizeMin, petals_sizeMax) || petals_sizeMin,
        'petals_noiseFactor': returnedItem['in_stock_since_years_ago'],
        'petals_c_saturation': petals_c_saturation,
        'petals_c_lightness': petals_c_lightness,
        'petals_nPoints': petals_nPoints,
        'petals_growth_b': petals_growth_b,
        'petals_growth_c': petals_growth_c,

        'stamens_amount': constrain(map(returnedItem['description_n_words'], 0, 250, stamens_amountMin, stamens_amountMax), stamens_amountMin, stamens_amountMax) || stamens_amountMin,
        'stamens_radius': constrain(map(returnedItem['description_length'], 0, 1500, stamens_radiusMin, stamens_radiusMax), stamens_radiusMin, stamens_radiusMax) || stamens_radiusMin,
        'stamens_size': map(returnedItem['description_avg_word_length'], 4, 10, stamens_sizeMin, stamens_sizeMax) || stamens_sizeMin,
        'stamens_noiseFactor': returnedItem['in_stock_since_years_ago'],
        'stamens_c_hue': stamens_c_hue,
        'stamens_c_saturation': stamens_c_saturation,
        'stamens_c_lightness': stamens_c_lightness,
        'stamens_nPoints': stamens_nPoints,
        'stamens_growth_b': stamens_growth_b,
        'stamens_growth_c': stamens_growth_c,

        'carpel_amount': 1 + returnedItem['author_n_words'] || carpel_amountMin,
        'carpel_radius': map(returnedItem['author_length'], 0, 28, carpel_sizeMin, carpel_sizeMax) || carpel_sizeMin,
        'carpel_size': map(returnedItem['author_length'], 0, 28, carpel_sizeMin, carpel_sizeMax) || carpel_sizeMin,
        'carpel_noiseFactor': returnedItem['in_stock_since_years_ago'],
        'carpel_c_saturation': carpel_c_saturation,
        'carpel_c_lightness': carpel_c_lightness,
        'carpel_nPoints': carpel_nPoints,
        'carpel_growth_b': carpel_growth_b,
        'carpel_growth_c': carpel_growth_c,
        'carpel_opacity': carpel_opacity,
    };
    // console.log(angle)
    return mapped_settings;
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

