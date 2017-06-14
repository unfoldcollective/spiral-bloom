function Flower(position, settings) {
    let self = this;
    self.position = position;
    self.settings = settings;
    self.settings.carpel_radius = self.settings.carpel_size;

    self.settings.progress_delta = 0.01;

    this.calc_petals = function() {
        let petals_progress = gompertz(self.settings.progress);
        self.petals.parts2 = _.shuffle(_.range(self.settings.petals_amount))
            .map(function(value) {
                return getPosOnCircle(self.position, petals_progress * self.settings.petals_radius, self.settings.rotation, self.settings.petals_amount, value);
            })
            .map(function(value) {
                let layer1_positions = get_leaf_positions(value, self.position, petals_progress * self.settings.petals_size, self.settings.petals_nPoints, self.settings.petals_noiseFactor);
                let layer2_positions = get_leaf_positions(value, self.position, petals_progress * self.settings.petals_size * 0.66, self.settings.petals_nPoints, self.settings.petals_noiseFactor);
                let layer1_color = [self.petals.color1[0], self.petals.color1[1], noisify(self.petals.color1[2], self.settings.lightness_noise_scale, 1), self.petals.color1[3] ];
                let layer2_color = [self.petals.color2[0], self.petals.color2[1], noisify(self.petals.color2[2], self.settings.lightness_noise_scale, 1), self.petals.color2[3] ];
                return {
                    layer1: {
                        positions: layer1_positions,
                        color: layer1_color,
                    },
                    layer2: {
                        positions: layer2_positions,
                        color: layer2_color,
                    },
                    
                }
            })
            .map(function(part) {
                let interValue = self.position;
                let layer2_positions_interspersed = _.flatMap(part.layer2.positions, (value, index) =>
                     index % 2 == 0 // check for even items
                     ? [value, interValue]
                     : value
                );
                part.layer2.positions = layer2_positions_interspersed;
                return part;
            });
    }

    self.sepals = {};
    self.sepals.color = [
        self.settings.background_hue,
        self.settings.sepals_c_saturation, 
        self.settings.sepals_c_lightness,
        self.settings.opacity,
    ];
    self.sepals.parts =
        _.shuffle(_.range(self.settings.sepals_amount))
        .map(function(value) {
            var sepals_rotation = self.settings.rotation + Math.PI / self.settings.sepals_amount;
            return getPosOnCircle(self.position, self.settings.progress * self.settings.sepals_radius, sepals_rotation, self.settings.sepals_amount, value);
        })
        .map(function(center) {
            let positions = get_leaf_positions(center, self.position, self.settings.progress * self.settings.sepals_size, self.settings.sepals_nPoints, self.settings.sepals_noiseFactor);
            let color = [self.sepals.color[0], self.sepals.color[1], noisify(self.sepals.color[2], self.settings.lightness_noise_scale, self.settings.sepals_noiseFactor), self.sepals.color[3] ];
            return {
                positions: positions,
                color: color,
            };
        })
    
    self.petals = {};
    self.petals.color1 = [
        random_hue_excluding(self.settings.background_hue, self.settings.hue_exclude_range),
        self.settings.petals_c_saturation,
        coin_flip(self.settings.petals_c_lightness, complement_linear(self.settings.petals_c_lightness, 100)),
        self.settings.opacity,
    ];
    self.petals.color2 = [
        normalise_to_hue(noisify(self.petals.color1[0], self.settings.hue_noise_scale, petals_noiseFactor)),
        self.settings.petals_c_saturation,
        complement_linear(self.petals.color1[2], 100),
        self.settings.opacity,
    ];

    self.petals.parts2;
    self.calc_petals();

    self.carpel = {};
    self.carpel.color = [
        complement_circular(self.petals.color1[0]),
        self.settings.carpel_c_saturation,
        self.settings.carpel_c_lightness,
        self.settings.carpel_opacity,
    ];
    self.carpel.centers =
        _.shuffle(_.range(self.settings.carpel_amount))
        .map(function(value) {
            let color = [self.carpel.color[0], self.carpel.color[1], noisify(self.carpel.color[2], self.settings.lightness_noise_scale, self.settings.carpel_noiseFactor), self.carpel.color[3] ];
            let position = getPosOnCircle(self.position, self.settings.progress * self.settings.carpel_radius, self.settings.rotation, self.settings.carpel_amount, value);
            return {
                color: color,
                position: position,
            };
        })

    self.stamens = {};
    self.stamens.color = [
        complement_circular(self.petals.color1[0]),
        self.settings.stamens_c_saturation,
        self.settings.stamens_c_lightness,
        self.settings.opacity,
    ];
    self.stamens.parts =
        _.shuffle(_.range(self.settings.stamens_amount))
        .map(function(value) {
            return getPosOnCircle(self.position, self.settings.progress * self.settings.stamens_radius, self.settings.rotation, self.settings.stamens_amount, value);
        })
        .map(function(center) {
            let center_pos_noisified = noisify_pos(center, self.settings.progress * self.settings.stamens_radius, self.settings.stamens_noiseFactor);
            let center_pos_closer = p5.Vector.lerp(center_pos_noisified, self.position, self.settings.stamens_size/self.settings.stamens_radius);
            // let center_pos_closer = center;
            let leaf_positions = get_leaf_positions(center_pos_noisified, center_pos_closer, self.settings.progress * self.settings.stamens_size, self.settings.stamens_nPoints, self.settings.stamens_noiseFactor);
            
            let d = dist(self.position.x, self.position.y, center_pos_closer.x, center_pos_closer.y);
            let stem_positions = [
                noisify_pos(self.position, d, self.settings.stamens_noiseFactor).x, noisify_pos(self.position, d, self.settings.stamens_noiseFactor).y, 
                self.position.x, self.position.y, 
                center_pos_closer.x, center_pos_closer.y, 
                noisify_pos(center_pos_closer, d, self.settings.stamens_noiseFactor).x, noisify_pos(center_pos_closer, d, self.settings.stamens_noiseFactor).y
            ];
            let color = [self.stamens.color[0], self.stamens.color[1], noisify(self.stamens.color[2], self.settings.lightness_noise_scale, self.settings.stamens_noiseFactor*0.5), self.stamens.color[3] ];
            return {
                leaf_positions: leaf_positions,
                stem_positions: stem_positions,
                color:          color,
            }
        });

    // Draw Flower
    this.draw = function () {        
        self.sepals.parts.map(function(part) {
            curveTightness(self.settings.sepals_curve_tightness);
            draw_leaf_from_pos(part.positions, part.color);
        });

        // petals level 2
        self.petals.parts2.map(function(part) {
            curveTightness(self.settings.petals_curve_tightness);
            draw_leaf_from_pos(part.layer1.positions,  part.layer1.color);
            draw_leaf_from_pos(part.layer2.positions,  part.layer2.color);
        });

        self.carpel.centers.map(function(center) {
            curveTightness(self.settings.carpel_curve_tightness);
            draw_leaf_ellipse(center.position.x, center.position.y, self.settings.progress * self.settings.carpel_size * 2, self.settings.progress * self.settings.carpel_size * 2, center.color);
        });
        
        self.stamens.parts.map(function(part) {
            curveTightness(self.settings.stamens_curve_tightness);
            draw_stem_from_pos(part.stem_positions, part.color);
            draw_leaf_ellipse(part.stem_positions[4], part.stem_positions[5], self.settings.progress * self.settings.stamens_size, self.settings.progress * self.settings.stamens_size, part.color);
            // draw_leaf_from_pos(part.leaf_positions, part.color);
        });

    }

    this.update_settings = function (new_settings) {
        this.settings = new_settings;
    }

    this.update_progress = function () {
        if (this.settings.progress < 2) {
            this.settings.progress += self.settings.progress_delta;
        }
    }
}

// drawing functions

function drawSplineLoop(points) {
    beginShape();
        for (var i = 0; i < points.length; i++) {
            curveVertex(points[i].x, points[i].y);
        }   
        curveVertex(points[0].x, points[0].y);
        curveVertex(points[1].x, points[1].y);
        curveVertex(points[2].x, points[2].y);
    endShape();
}

function draw_leaf_from_pos(positions, colorHSLA) {
    fill(hslaToP5RGBA(colorHSLA));
    stroke(hslaToP5RGBA([colorHSLA[0], colorHSLA[1], colorHSLA[2] * 0.3, colorHSLA[3] * 0.3 ]));
    drawSplineLoop(positions);
    noStroke();
    noFill();    
}

function draw_leaf_ellipse(center_x, center_y, width, height, colorHSLA) {
    fill(hslaToP5RGBA(colorHSLA));
    stroke(hslaToP5RGBA([colorHSLA[0], colorHSLA[1], colorHSLA[2] * 0.3, colorHSLA[3] * 0.3 ]));
    ellipse(center_x, center_y, width, height);
    noStroke();
    noFill();
}

function draw_stem_from_pos(positions, colorHSLA) {
    stroke(hslaToP5RGBA(colorHSLA));
    curve(
        positions[0], positions[1],
        positions[2], positions[3],
        positions[4], positions[5],
        positions[6], positions[7],
    );
    noStroke();
}

// structural functions

function get_leaf_positions(center_pos, base_pos, size, nPoints, noiseFactor) {
    var positions = 
        _.range(nPoints)
        .map(function(value, index) {
            return getPosOnCircle(center_pos, size, rotation, nPoints, index);
        })
        .map(function(value, index) {
            return noisify_pos(value, size, noiseFactor);
        });
    
    var closest_index_to_base_pos = positions.reduce(function(prevVal, elem, index, array) {
        // prevDistance = dist(array[prevVal].x, array[prevVal].y, base_pos.x, base_pos.y);
        // curDistance  = dist(elem.x, elem.y, base_pos.x, base_pos.y);
        // distSquared() runs faster than dist()
        prevDistance = distSquared(array[prevVal].x, array[prevVal].y, base_pos.x, base_pos.y);
        curDistance  = distSquared(elem.x, elem.y, base_pos.x, base_pos.y);

        return prevDistance < curDistance ? prevVal : index;
    }, 0);
    
    positions[closest_index_to_base_pos] = base_pos;

    return positions;
}

function noisify_pos(pos, scale, noiseFactor) {
    return createVector( noisify(pos.x, scale, noiseFactor), noisify(pos.y, scale, noiseFactor) );
}

// color helpers

function random_hue_excluding(background_hue, hue_exclude_range) {
    var hue_include_range = 360 - 2 * hue_exclude_range;
    var int_min = background_hue + hue_exclude_range;
    var int_max = background_hue + hue_exclude_range + hue_include_range;
    var int_excluding = getRandomBetween(int_min, int_max);
    var hue_excluding = normalise_to_hue(int_excluding)
    return hue_excluding;
}

function normalise_to_hue(orientation) {
    orientation = orientation % 360;
    if (orientation < 0)
    {
        orientation += 360;
    }
    return orientation;
}

function complement_linear(value, max) {
    return max - value;
}

function complement_circular(value) {
    return normalise_to_hue(value + 0.5 * 360)
}

function rgb_with_alpha(original_color_spec, alpha) {
    var original_color = color(original_color_spec);
    return color(original_color.levels[0], original_color.levels[1], original_color.levels[2], alpha)
}

function hsluvToP5Rgb(h, s, l) {
    var rgb = hsluv.hsluvToRgb([h, s, l]);
    return color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function hslaToP5RGBA(hslaColor) {
    var rgb = hsluv.hsluvToRgb([hslaColor[0], hslaColor[1], hslaColor[2]]);
    return color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255, hslaColor[3]);
}

function p5RgbToHsluv(color) {
    return hsluv.rgbToHsluv([color.levels[0], color.levels[1], color.levels[2]])
}


// general helpers

function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getPosOnCircle(midPosition, radius, rotation, n, index) {
    var angle = (index * TWO_PI / n) + rotation;
    return createVector(
        midPosition.x + radius * Math.cos(angle), 
        midPosition.y + radius * Math.sin(angle)
    );
}

function noisify(x, scale, noiseFactor) {
    seed += 0.01;
    return x + (noise(seed)-0.5) * noiseFactor * scale;
}

function coin_flip(value1, value2) {
    if (Math.random(1) < 0.5) {
        return value1;
    } else {
        return value2;
    }
}

function distSquared(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return dx * dx + dy * dy;
}

function gompertz(x, a=1, b=5, c=4) {
    // parametrizable sigmoid functions
    // www.wikipedia.org/wiki/Gompertz_function
    // a: upper asymptote
    // b: displacement along x-axis
    // c: growth rate
    return a * Math.pow(Math.E, -b * Math.pow(Math.E, -c * x));
}