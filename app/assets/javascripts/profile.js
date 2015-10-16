ProfileEvents = {
  init: function(){
    this.completeProfile();
  },
  completeProfile: function(){
    $('a.completeProfile').click(function(e){
      e.preventDefault();
      $(this).addClass('hide');
      $('.progress-details').removeClass('hide');
    })
  }
}