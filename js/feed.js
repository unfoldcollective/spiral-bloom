function Feed(jsonInput, selector="#feed ul") {
    let self = this;
    self.init = function () {
        self.inputs = jsonInput;
        self.feedElem = $(selector);
        self.update();
    }

    self.update = function () {
        console.log('Feed.update()')
        
        // empty feed
        self.feedElem.empty();
        
        // add new content
        self.latest3 = _.slice(self.inputs,0,3);
        _.forEach(self.latest3, function (input) {
            self.addInputToFeed(input);
        })
    };
    self.addInputToFeed = function (input) {
        let $item = self.createItemFromInput(input)
        self.addItemToFeed($item);
    }
    self.createItemFromInput = function (input) {
        console.log("creating item for: ", input);
        let borrowed = input.time_stamp;
        let title = input.title;
        let author = input.author || "?";
        htmlString = '\
        <li class="animated fadeInUp dt bb b--black-05 pa2 mt2 shadow-5" href="#0">\
            <div class="dtc">\
              <div class="dtc v-mid w3 h3  bg-light-blue">\
                <img src="/img/icon-read.png" class="db w2 h2 center">\
              </div>\
            </div>\
            <div class="dtc v-top pv1 ph3">\
              <h3 class="f6 fw4 lh-title black-50">Vrátené</h1>\
              <h2 class="f5 fw4 lh-title mt1 black">'+borrowed+'</h2>\
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