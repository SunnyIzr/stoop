$('.posts').html('<%= j render @posts %>');
$('.building-neighborhood-bar').removeClass('building')
$('.building-neighborhood-bar').removeClass('neighborhood')
$('.building-neighborhood-bar').addClass('<%= @filter %>')