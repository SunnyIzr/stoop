$(function(){

    //Uncomment the line and switch modes
    //$.fn.editable.defaults.mode = 'inline';

    //editables 
    // $('#username').editable({
    //     type: 'text',
    //     pk: 1,
    //     name: 'username',
    //     title: 'Enter username'
    // });

    // $('#firstname').editable({
    //     validate: function(value) {
    //         if($.trim(value) == '') return 'This field is required';
    //     }
    // });

    // $('#sex').editable({
    //     prepend: "not selected",
    //     source: [
    //         {value: 1, text: 'Male'},
    //         {value: 2, text: 'Female'}
    //     ],
    //     display: function(value, sourceData) {
    //         var colors = {"": "gray", 1: "green", 2: "blue"},
    //             elem = $.grep(sourceData, function(o){return o.value == value;});

    //         if(elem.length) {
    //             $(this).text(elem[0].text).css("color", colors[value]);
    //         } else {
    //             $(this).empty();
    //         }
    //     }
    // });

    // $('#status').editable();

    // $('#group').editable({
    //     showbuttons: false
    // });

    // $('#dob').editable();

    // $('#comments').editable({
    //     showbuttons: 'bottom'
    // });

    $('.inline-date').editable({
        format: 'yyyy-mm-dd',
        viewformat: 'M dd, yyyy',
        placement: 'right',
        datepicker: {
            weekStart: 1
        },
        pk: 1,
        name: 'expiration'
    });
    
    
    $('.inline-date').editable({
        format: 'yyyy-mm-dd',
        viewformat: 'M dd, yyyy',
        placement: 'right',
        datepicker: {
            weekStart: 1
        },
        pk: 1,
        name: 'date'
    });


    //inline


    $('.inline-field').editable({
        type: 'text',
        pk: 1,
        name: 'username',
        mode: 'inline',
        rows: 7,
        cols: 75
    });

    // $('#inline-firstname').editable({
    //     validate: function(value) {
    //         if($.trim(value) == '') return 'This field is required';
    //     },
    //     mode: 'inline'
    // });

    // $('.inline-status').editable({
    //     mode: 'inline',
    //     pk: 1,
    //     source: [
    //         {value: 1, text: 'Complete'},
    //         {value: 2, text: 'Processing'}
    //     ],
    //     display: function(value, sourceData) {
    //         var colors = {"": "gray", 1: "green", 2: "blue"},
    //             elem = $.grep(sourceData, function(o){return o.value == value;});

    //         if(elem.length) {
    //             $(this).text(elem[0].text).css("color", colors[value]);
    //         } else {
    //             $(this).empty();
    //         }
    //     }
    // });
    
    $('.inline-incentive-type').editable({
        mode: 'inline',
        pk: 1,
        source: [
            {value: 'cash', text: 'Cash'},
            {value: 'percent', text: 'Percent'}
        ],
        display: function(value, sourceData) {
            var colors = {0: "blue", 1: "green"},
                elem = $.grep(sourceData, function(o){return o.value == value;});

            if(elem.length) {
                $(this).text(elem[0].text).css("color", colors[value]);
            } else {
                $(this).empty();
            }
        }
    });
    
    $('.inline-building').editable({
        mode: 'inline',
        pk: 1,
        source: [
            {value: 'cash', text: 'Cash'},
            {value: 'percent', text: 'Percent'}
        ],
        display: function(value, sourceData) {
            var colors = {0: "blue", 1: "green"},
                elem = $.grep(sourceData, function(o){return o.value == value;});

            if(elem.length) {
                $(this).text(elem[0].text).css("color", colors[value]);
            } else {
                $(this).empty();
            }
        }
    });
    
    $('.inline-industry').editable({
        mode: 'inline',
        pk: 1,
        source: [
            {value: 'restaurant/bar', text: 'Restaurant/Bar'},
            {value: 'retail', text: 'Retail'},
            {value: 'nightclub', text: 'Nightclub'},
            {value: 'beauty/grooming', text: 'Beauty/Grooming'},
            {value: 'hotel', text: 'Hotel'}
        ],
        display: function(value, sourceData) {
            var colors = {0: "blue", 1: "blue"},
                elem = $.grep(sourceData, function(o){return o.value == value;});

            if(elem.length) {
                $(this).text(elem[0].text).css("color", colors[value]);
            } else {
                $(this).empty();
            }
        }
    });
    
    
    $('.inline-profession').editable({
        mode: 'inline',
        pk: 1,
        source: [
            {value: 'finance', text: 'Finance'},
            {value: 'legal', text: 'Legal'},
            {value: 'medicine', text: 'Medicine'},
            {value: 'technology', text: 'Technology'},
            {value: 'real estate', text: 'Real Estate'}
        ],
        display: function(value, sourceData) {
            var colors = {0: "blue", 1: "blue"},
                elem = $.grep(sourceData, function(o){return o.value == value;});

            if(elem.length) {
                $(this).text(elem[0].text).css("color", colors[value]);
            } else {
                $(this).empty();
            }
        }
    });
    
    $('.inline-interests').editable({
        mode: 'inline',
        pk: 1,
        source: [
            {value: 'movies', text: 'Movies'},
            {value: 'music', text: 'Music'},
            {value: 'books', text: 'Books'},
            {value: 'sports', text: 'Sports'},
            {value: 'foodie', text: 'Foodie'}
        ]
    });
    $('.inline-meridian').editable({
        mode: 'inline',
        pk: 1,
        source: [
            {value: 'am', text: 'am'},
            {value: 'pm', text: 'pm'}
        ],
        display: function(value, sourceData) {
            var colors = {0: "blue", 1: "green"},
                elem = $.grep(sourceData, function(o){return o.value == value;});

            if(elem.length) {
                $(this).text(elem[0].text).css("color", colors[value]);
            } else {
                $(this).empty();
            }
        }
    });


    $('.inline-state').editable({
        mode: 'inline',
        pk: 1,
        source: [
            {value: "Alaska", text: "AK"},
            {value: "Alabama", text: "AL"},
            {value: "Arkansas", text: "AR"},
            {value: "American Samoa", text: "AS"},
            {value: "Arizona", text: "AZ"},
            {value: "California", text: "CA"},
            {value: "Colorado", text: "CO"},
            {value: "Connecticut", text: "CT"},
            {value: "District of Columbia", text: "DC"},
            {value: "Delaware", text: "DE"},
            {value: "Florida", text: "FL"},
            {value: "Georgia", text: "GA"},
            {value: "Hawaii", text: "HI"},
            {value: "Iowa", text: "IA"},
            {value: "Idaho", text: "ID"},
            {value: "Illinois", text: "IL"},
            {value: "Indiana", text: "IN"},
            {value: "Kansas", text: "KS"},
            {value: "Kentucky", text: "KY"},
            {value: "Louisiana", text: "LA"},
            {value: "Massachusetts", text: "MA"},
            {value: "Maryland", text: "MD"},
            {value: "Maine", text: "ME"},
            {value: "Michigan", text: "MI"},
            {value: "Minnesota", text: "MN"},
            {value: "Missouri", text: "MO"},
            {value: "Mississippi", text: "MS"},
            {value: "Montana", text: "MT"},
            {value: "North Carolina", text: "NC"},
            {value: "North Dakota", text: "ND"},
            {value: "Nebraska", text: "NE"},
            {value: "New Hampshire", text: "NH"},
            {value: "New Jersey", text: "NJ"},
            {value: "New Mexico", text: "NM"},
            {value: "Nevada", text: "NV"},
            {value: "New York", text: "NY"},
            {value: "Ohio", text: "OH"},
            {value: "Oklahoma", text: "OK"},
            {value: "Oregon", text: "OR"},
            {value: "Pennsylvania", text: "PA"},
            {value: "Puerto Rico", text: "PR"},
            {value: "Rhode Island", text: "RI"},
            {value: "South Carolina", text: "SC"},
            {value: "South Dakota", text: "SD"},
            {value: "Tennessee", text: "TN"},
            {value: "Texas", text: "TX"},
            {value: "Utah", text: "UT"},
            {value: "Virginia", text: "VA"},
            {value: "Virgin Islands", text: "VI"},
            {value: "Vermont", text: "VT"},
            {value: "Washington", text: "WA"},
            {value: "Wisconsin", text: "WI"},
            {value: "West Virginia", text: "WV"},
            {value: "Wyoming", text: "WY"}
        ],
        display: function(value, sourceData) {
            var colors = {0: "blue", 1: "green"},
                elem = $.grep(sourceData, function(o){return o.value == value;});

            if(elem.length) {
                $(this).text(elem[0].text).css("color", colors[value]);
            } else {
                $(this).empty();
            }
        }
    });

    // $('#inline-group').editable({
    //     showbuttons: false,
    //     mode: 'inline'
    // });

    // $('#inline-dob').editable({mode: 'inline'});

    // $('.inline-comments').editable({
    //     showbuttons: 'bottom',
    //     mode: 'inline'
    // });

});