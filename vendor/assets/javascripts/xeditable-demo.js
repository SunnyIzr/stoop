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