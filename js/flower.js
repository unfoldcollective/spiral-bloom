function Flower(position, settings) {
    let self = this;
    self.position = position;
    self.settings = settings;
    self.settings.carpel_radius = self.settings.carpel_size;

    self.init = function () {
        self.check_recency();

        self.calc_sepals_noises();
        self.calc_sepals_colors();
        self.calc_sepals_leaves();

        self.calc_petals_noises();
        self.calc_petals_colors();
        self.calc_petals_leaves();
        
        self.calc_stamens_noises();
        self.calc_stamens_colors();
        self.calc_stamens_parts();

        self.calc_carpel_colors();
        self.calc_carpel_parts();
    }

    ////////////
    // SEPALS //
    //////////// 

    self.sepals = {};
    self.sepals.indexes = _.shuffle(_.range(self.settings.sepals_amount));

    self.sepals.color = [
        self.settings.background_hue,
        self.settings.sepals_c_saturation, 
        self.settings.sepals_c_lightness,
        self.settings.opacity * self.settings.recency,
    ];

    self.calc_sepals_noises = function () {
        self.sepals.noises = 
            self.sepals.indexes
            .map(function() {
                let noiseStart = 10;
                return noisify_pos(createVector(noiseStart,noiseStart), self.settings.sepals_size, self.settings.noiseFactor).add(-noiseStart, -noiseStart);
            });
    };

    self.calc_sepals_colors = function () {
        self.sepals.colors = 
            self.sepals.indexes
            .map(function() {
                return [self.sepals.color[0], self.sepals.color[1], noisify(self.sepals.color[2], self.settings.lightness_noise_scale, 1), self.sepals.color[3] ];
            });
    };

    self.calc_sepals_leaves = function() {
        let sepals_progress = self.settings.recency * gompertz(self.settings.progress, a=1, b=4, c=5);
        self.sepals.leaves = 
            self.sepals.indexes
            .map(function(value) {
                return getPosOnCircle(self.position, sepals_progress * self.settings.sepals_radius, self.settings.rotation, self.settings.sepals_amount, value);
            })
            .map(function(center, leafIndex) {
                let positions = get_leaf_positions(center, sepals_progress * self.settings.sepals_size, self.settings.sepals_nPoints);

                let positions_noisified = 
                    positions
                    .map(function(position, leafPointIndex) {
                        return p5.Vector.add(position, self.sepals.noises[leafIndex][leafPointIndex]);
                    });
                // attach base point to flower center
                positions_noisified[index_closest_to(positions_noisified, self.position)] = self.position;

                return {
                    positions: positions_noisified
                };
            });
    };
    
    ////////////
    // PETALS //
    //////////// 

    self.petals = {};
    self.petals.indexes = _.shuffle(_.range(self.settings.petals_amount));
    self.petals.color1 = [
        random_hue_excluding(self.settings.background_hue, self.settings.hue_exclude_range),
        self.settings.petals_c_saturation,
        coin_flip(self.settings.petals_c_lightness, complement_linear(self.settings.petals_c_lightness, 100)),
        self.settings.opacity * self.settings.recency,
    ];
    self.petals.color2 = [
        normalise_to_hue(noisify(self.petals.color1[0], self.settings.hue_noise_scale, self.settings.noiseFactor)),
        self.settings.petals_c_saturation,
        complement_linear(self.petals.color1[2], 100),
        self.settings.opacity * self.settings.recency,
    ];

    self.calc_petals_noises = function () {
        self.petals.noises = 
            self.petals.indexes
            .map(function() {
                let noiseStart = 10;
                let leafPointNoises = 
                    _.range(self.settings.petals_nPoints)
                    .map(function(leafPoint) {
                        return noisify_pos(createVector(noiseStart,noiseStart), self.settings.petals_size, self.settings.noiseFactor).add(-noiseStart, -noiseStart);
                    });
                return leafPointNoises;
            });
    };

    self.calc_petals_colors = function () {
        self.petals.colors = 
            self.petals.indexes
            .map(function() {
                let layer1_color = [self.petals.color1[0], self.petals.color1[1], noisify(self.petals.color1[2], self.settings.lightness_noise_scale, 1), self.petals.color1[3] ];
                let layer2_color = [self.petals.color2[0], self.petals.color2[1], noisify(self.petals.color2[2], self.settings.lightness_noise_scale, 1), self.petals.color2[3] ];
                return {
                    color1: layer1_color,
                    color2: layer2_color,
                };
            });
    };


    self.calc_petals_leaves = function() {
        let petals_progress = self.settings.recency * gompertz(self.settings.progress, a=1, b=5, c=5);
        self.petals.leaves = 
            self.petals.indexes
            .map(function(value) {
                return getPosOnCircle(self.position, petals_progress * self.settings.petals_radius, self.settings.rotation, self.settings.petals_amount, value);
            })
            .map(function(center, leafIndex) {
                let layer1_positions = get_leaf_positions(center, petals_progress * self.settings.petals_size, self.settings.petals_nPoints);
                let layer2_positions = get_leaf_positions(center, petals_progress * self.settings.petals_size * 0.66, self.settings.petals_nPoints);
                
                // add precalculated noise
                let layer1_positions_noisified = 
                    layer1_positions
                    .map(function(position, leafPointIndex) {
                        return p5.Vector.add(position, p5.Vector.mult(self.petals.noises[leafIndex][leafPointIndex], petals_progress));
                    });
                let layer2_positions_noisified = 
                    layer2_positions
                    .map(function(position, leafPointIndex) {
                        return p5.Vector.add(position, p5.Vector.mult(self.petals.noises[leafIndex][leafPointIndex], petals_progress));
                    });

                // attach base point to flower center
                layer1_positions_noisified[index_closest_to(layer1_positions_noisified, self.position)] = self.position;
                layer2_positions_noisified[index_closest_to(layer1_positions_noisified, self.position)] = self.position;                

                return {
                    positions1: layer1_positions_noisified,
                    positions2: layer2_positions_noisified,
                };
            })
            .map(function(part) {
                let interValue = self.position;
                let layer2_positions_interspersed = _.flatMap(part.positions2, (value, index) =>
                     index % 2 == 0 // check for even items
                     ? [value, interValue]
                     : value
                );
                part.positions2 = layer2_positions_interspersed;
                return part;
            });
    };

    ////////////
    // CARPEL //
    //////////// 

    self.carpel = {};
    self.carpel.indexes = _.shuffle(_.range(self.settings.carpel_amount));
    self.carpel.color = [
        complement_circular(self.petals.color1[0]),
        self.settings.carpel_c_saturation,
        self.settings.carpel_c_lightness,
        self.settings.carpel_opacity * self.settings.recency,
    ];

    self.calc_carpel_colors = function () {
        self.carpel.colors =
            self.carpel.indexes
            .map(function() {
                return [self.carpel.color[0], self.carpel.color[1], noisify(self.carpel.color[2], self.settings.lightness_noise_scale, self.settings.noiseFactor), self.carpel.color[3] ];
            });
    };

    self.calc_carpel_parts = function () {
        let carpel_progress = self.settings.recency * gompertz(self.settings.progress, a=1, b=5, c=6);
        self.carpel.parts =
            self.carpel.indexes
            .map(function(index) {
                let center = getPosOnCircle(self.position, carpel_progress * self.settings.carpel_radius, self.settings.rotation, self.settings.carpel_amount, index);
                return {
                    center: center,
                    radius: carpel_progress * self.settings.carpel_size,
                }
                
            });
    };

    ////////////
    // STAMEN //
    //////////// 

    self.stamens = {};
    self.stamens.indexes = _.shuffle(_.range(self.settings.stamens_amount));
    self.stamens.color = [
        complement_circular(self.petals.color1[0]),
        self.settings.stamens_c_saturation,
        self.settings.stamens_c_lightness,
        self.settings.opacity * self.settings.recency,
    ];
    
    self.calc_stamens_noises = function () {
        self.stamens.noises = 
            self.stamens.indexes
            .map(function() {
                let noiseStart = 10;
                return noisify_pos(createVector(noiseStart,noiseStart), self.settings.stamens_radius, self.settings.noiseFactor).add(-noiseStart, -noiseStart);
            });
    };

    self.calc_stamens_colors = function () {
        self.stamens.colors =
            self.stamens.indexes
            .map(function() {
                return [self.stamens.color[0], self.stamens.color[1], noisify(self.stamens.color[2], self.settings.lightness_noise_scale, self.settings.noiseFactor*0.5), self.stamens.color[3] ];
            });
    };

    self.calc_stamens_parts = function () {
        let stamens_progress = self.settings.recency * gompertz(self.settings.progress, a=1, b=5, c=4);
        self.stamens.parts =
            self.stamens.indexes
            .map(function(index) {
                return getPosOnCircle(self.position, stamens_progress * self.settings.stamens_radius, self.settings.rotation, self.settings.stamens_amount, index);
            })
            .map(function(center, centerIndex) {
                let stem_positions = [
                    self.position.x + self.stamens.noises[centerIndex].x, self.position.y + self.stamens.noises[centerIndex].y, 
                    self.position.x, self.position.y, 
                    center.x + stamens_progress * self.stamens.noises[centerIndex].x, center.y + stamens_progress * self.stamens.noises[centerIndex].y, 
                    center.x + stamens_progress * 0.1 * self.settings.stamens_radius * self.stamens.noises[centerIndex].x, center.y + stamens_progress * 0.1 * self.settings.stamens_radius * self.stamens.noises[centerIndex].y, 
                ];

                return {
                    stem_positions: stem_positions,
                    radius: stamens_progress * self.settings.stamens_size,
                }
            });
    };

    // Draw Flower
    self.draw = function () {   
        curveTightness(self.settings.curve_tightness);     
        self.sepals.leaves.map(function(leaf, leafIndex) {
            self.draw_leaf_from_pos(leaf.positions, self.sepals.colors[leafIndex]);
        });

        self.petals.leaves.map(function(leaf, leafIndex) {
            self.draw_leaf_from_pos(leaf.positions1,  self.petals.colors[leafIndex].color1);
            self.draw_leaf_from_pos(leaf.positions2,  self.petals.colors[leafIndex].color2);
        });

        self.carpel.parts.map(function(part, partIndex) {
            draw_leaf_ellipse(part.center.x, part.center.y, part.radius * 2 , part.radius * 2, self.carpel.colors[partIndex]);
        });
        
        self.stamens.parts.map(function(part, partIndex) {
            self.draw_stem_from_pos(part.stem_positions, self.stamens.colors[partIndex]);
            draw_leaf_ellipse(part.stem_positions[4], part.stem_positions[5], part.radius, part.radius, self.stamens.colors[partIndex]);
        });

    };

    self.update_settings = function (new_settings) {
        self.settings = new_settings;
    };

    self.update_progress = function () {
        if (self.settings.progress < 2) {
            self.settings.progress += self.settings.progress_delta;
        }
    };

    self.update = function () {
        self.update_progress();
        self.calc_sepals_leaves();
        self.calc_petals_leaves();
        self.calc_carpel_parts();
        self.calc_stamens_parts();
    };

    self.check_recency = function () {
        if (self.settings.recency < this.settings.recency_threshold) {
            _.set(self.settings, "curve_tightness", 1);
        }
    };

    self.draw_stem_from_pos = function (positions, colorHSLA) {
        stroke(hslaToP5RGBA(colorHSLA));
        if (self.settings.curve_tightness != 1) {
            curve(
                positions[0], positions[1],
                positions[2], positions[3],
                positions[4], positions[5],
                positions[6], positions[7],
            );
        } 
        else {
            line(
                positions[2], positions[3],
                positions[4], positions[5]
            );
        }
        noStroke();
    };

    self.draw_leaf_from_pos = function (positions, colorHSLA) {
        fill(hslaToP5RGBA(colorHSLA));
        stroke(hslaToP5RGBA([colorHSLA[0], colorHSLA[1], colorHSLA[2] * 0.3, colorHSLA[3] * 0.3 ]));
        if (self.settings.curve_tightness != 1) {
            drawSplineLoop(positions);
        }
        else {
            drawLineLoop(positions);
        }
        noStroke();
        noFill();    
    };

    self.init();
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

function drawLineLoop(points) {
    beginShape();
        for (var i = 0; i < points.length; i++) {
            curveVertex(points[i].x, points[i].y);
        }
    endShape(CLOSE);
}

function draw_leaf_ellipse(center_x, center_y, width, height, colorHSLA) {
    fill(hslaToP5RGBA(colorHSLA));
    stroke(hslaToP5RGBA([colorHSLA[0], colorHSLA[1], colorHSLA[2] * 0.3, colorHSLA[3] * 0.3 ]));
    ellipse(center_x, center_y, width, height);
    noStroke();
    noFill();
}

// structural functions

function get_leaf_positions(center_pos, size, nPoints, noiseFactor=0) {
    var positions = 
        _.range(nPoints)
        .map(function(value, index) {
            return getPosOnCircle(center_pos, size, rotation, nPoints, index);
        })
    if (noiseFactor > 0) {
        positions = positions.map(function(value) {
            return noisify_pos(value, size, noiseFactor);
        });
    }
    return positions;
}

function index_closest_to(positions, base_pos) {
    return positions.reduce(function(prevVal, elem, index, array) {
        // distSquared() runs faster than dist()
        prevDistance = distSquared(array[prevVal].x, array[prevVal].y, base_pos.x, base_pos.y);
        curDistance  = distSquared(elem.x, elem.y, base_pos.x, base_pos.y);

        return prevDistance < curDistance ? prevVal : index;
    }, 0);
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
    seed += seedDelta;
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