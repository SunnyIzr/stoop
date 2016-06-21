var SearchAutocomplete = (function () {
    var self = {};
    var searchTerm = null;
    var runningRequests = {};
    var searchDelay = null;
    var resultTemplate = $('<li class="ui-menu-item"><a><img class="img-responsive mini-avatar"><span class="name"></span></a></li>');


    return $.extend(self, {
        $el: null,
        $autoComplete: null,
        init: function () {
            self.$el = $('header .search-column');
            self.$autoComplete = self.$el.find('.ui-autocomplete');

            $('.search-query')
                .keydown(self.overwriteKeys)
                .keyup(self.doSearch)
                .blur(function () {
                    self.$autoComplete.fadeOut(200,function(){
                        self.resetAutoComplete();
                        self.$autoComplete.hide();
                    });

                })
        },
        resetAutoComplete: function () {
            self.$autoComplete.find('h5').hide().filter('.loading').show();
            self.$autoComplete.find('ul').html('');
        },
        overwriteKeys: function (e) {
            if ([13, 38, 40].indexOf(e.keyCode) >= 0) {
                e.preventDefault();

                var $options = self.$autoComplete.find('li');
                if ($options.length > 0) {
                    switch (e.keyCode) {
                        case 40: //down
                        case 38: //up
                            //if object is selected
                            if ($options.filter('.selected').length) {
                                //next item to select
                                var nextIndex = $options.filter('.selected').index($options.selector) + (e.keyCode == 40 ? 1 : -1);
                                //wrap
                                if (nextIndex < 0) nextIndex = $options.length - 1;
                                if (nextIndex > $options.length - 1) nextIndex = 0;
                                $options.removeClass('selected');
                                $options.eq(nextIndex).addClass('selected');
                            } else { //if no object is selected
                                e.keyCode == 40 ? $options.first().addClass('selected') : $options.last().addClass('selected');
                            }
                            break;
                        case 13: //enter
                            window.location = $options.filter('.selected').find('a').attr('href');
                            break;
                    }
                }
            }
        },
        doSearch: function (e) {
            var newSearchTerm = $(this).val();
            if (newSearchTerm.length >= 3 && searchTerm != newSearchTerm) {
                searchTerm = newSearchTerm;
                self.$autoComplete.hide();
                if (searchDelay != null) clearTimeout(searchDelay);
                searchDelay = setTimeout(function () {
                    self.abortSearch();

                    //show an empty auto complete
                    self.resetAutoComplete();
                    self.$autoComplete.show();

                    self.searchRequest('users');
                    self.searchRequest('businesses');
                    self.searchRequest('yelp');
                }, 500);
            } else if (newSearchTerm.length <= 2) {
                searchTerm = newSearchTerm;
                self.abortSearch();
                self.$autoComplete.hide();
            }
        },
        abortSearch: function(){
            //cancel all previous requests
            for (var requestKey in runningRequests) {
                runningRequests[requestKey].abort();
                delete runningRequests[requestKey];
            }
        },
        searchRequest: function (type) {
            runningRequests[type] = $.post('/' + type + '/search', {term: searchTerm}, function (res) {
                delete runningRequests[type];
                self.appendResults(type, res);
            }).fail(function () {
                delete runningRequests[type];
                self.appendResults(type, []);
            })
        },
        appendResults: function (type, results) {
            if (results.length > 0) {
                //hide loading
                self.$autoComplete.find('h5.loading').hide();

                //show the header
                self.$autoComplete.find('.' + type).show();

                //append each of the results
                var $list = self.$autoComplete.find('ul.' + type + 'List');
                results.forEach(function (result) {
                    var $resultTemplate = resultTemplate.clone();
                    $resultTemplate.find('a').attr('href', '/' + (type == 'yelp' ? 'unverified_businesses' : type) + '/' + result.id)
                    $resultTemplate.find('.name').html(result.name);
                    if (typeof result.avatar !== 'undefined') {
                        $resultTemplate.find('img').attr('src', result.avatar == 'default-avatar.png' ? '/assets/default-avatar.png' : result.avatar)
                    } else {
                        $resultTemplate.find('img').remove();
                    }
                    $list.append($resultTemplate);
                });
            } else {
                console.log(Object.keys(runningRequests).length);
                if (Object.keys(runningRequests).length == 0 && self.$autoComplete.find('li').length == 0) {
                    self.$autoComplete.find('h5.loading').hide();
                    self.$autoComplete.find('h5.noResults').show();
                }
            }
        }

    });

})();

