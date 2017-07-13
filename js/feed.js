function Feed(jsonInput, selector="#feed ul") {
    let self = this;
    self.init = function () {
        self.inputs = jsonInput;
        self.feedElem = $(selector);
        self.update();
    }

    self.update = function () {
        // console.log('Feed.update()')
        
        // empty feed
        self.feedElem.empty();
        
        // add new content
        self.latest3 = _.slice(self.inputs,0,3);
        
        var intervalID1 = setTimeout(function(){
            self.addInputToFeed(self.inputs[0], 0)
        }, 1000);
        var intervalID2 = setTimeout(function(){
            self.addInputToFeed(self.inputs[1], 1)
        }, 2000);
        var intervalID3 = setTimeout(function(){
            self.addInputToFeed(self.inputs[2], 2)
        }, 3000);

        // _.forEach(self.latest3, function (input) {
        //     self.addInputToFeed(input);
        // })
    };
    self.addInputToFeed = function (input, flowerIndex) {
        let $item = self.createItemFromInput(input, flowerIndex)
        self.addItemToFeed($item);
    }
    self.createItemFromInput = function (input, flowerIndex) {
        // console.log("creating item for: ", input);
        let time_ago = $.timeago(input.time_stamp);
        let title = input.title;
        let author = input.author || "?";
        let iconName;
        if (input.type == "eBook" || input.type == "ePub" || input.type == "ePaper") {
            iconName = "icon-read";
        }
        else if (input.type == "eAudio" || input.type == "eMusic") {
            iconName = "icon-listen";
        }
        else if (input.type == "eVideo") {
            iconName = "icon-watch";
        }
        let flowerColor = hslaToP5RGBA(flower_spiral[flowerIndex].petals.color1);
        let bgColor = 'rgba('+flowerColor.levels[0]+','+flowerColor.levels[1]+','+flowerColor.levels[2]+',100)';

        htmlString = '\
        <li class="animated fadeInUp dt bb b--black-05 pa2 mt2 shadow-5" href="#0">\
            <div class="dtc">\
              <div class="dtc v-mid w3 h3" style="background-color: '+bgColor+'">\
                <img src="/img/'+iconName+'.png" class="db w2 h2 center">\
              </div>\
            </div>\
            <div class="dtc v-top pv1 ph3">\
              <h3 class="f6 fw4 lh-title black-50">Vrátené</h1>\
              <h2 class="f5 fw4 lh-title mt1 black">'+time_ago+'</h2>\
            </div>\
            <div class="dtc v-top pv1 ph3">\
              <h3 class="f6 fw4 lh-title black-50">Názov</h1>\
              <h2 class="f5 fw4 lh-title mw6 mt1 black">'+title+'</h2>\
            </div>\
            <div class="dtc v-top pv1 ph3">\
              <h3 class="f6 fw4 lh-title black-50">Autor</h1>\
              <h2 class="f5 fw4 lh-title mt1 black">'+author+'</h2>\
            </div>\
        </li>\
      '
        return $(htmlString);
    };
    self.addItemToFeed = function function_name($feedItem) {
        self.feedElem.append($feedItem);
    };
    
    self.init();
}
