ProfileEvents = {
  init: function(){
    this.profilePic();
    
  },
  profilePic: function(){
    $('.change-profile-pic').click(function(e){
      e.preventDefault();
      $('.new-profile-pic-form').removeClass('hide')
      $('.change-profile-pic').addClass('hide')
    })
  }
}