var FollowEvents = {
  init: function(){
    this.newFollow();
  },
  newFollow: function(){
    $(document).on('ajax:success','.new_follow', function(e,followStatus,status,xhr){
      Follow.refresh(followStatus)
    })
  }
}

var Follow = {
  refresh: function(followStatus){
    if ( followStatus == true ){
      $('.follow-btn').attr('value','Unfollow')
    } else {
      $('.follow-btn').attr('value','Follow')
    }
  }
}