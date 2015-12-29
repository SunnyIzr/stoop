var Notifications = {
  readAllEvent: function(){
    $('a.unread-notifications').click(function(e){
      Notifications.readAll()
    })
  },
  read: function(convoId){
    $.post('/notifications/read-chat',{convo_id: convoId},function(res){
      Notifications.update();
    })
  },
  update: function(){
    $.getJSON('/unread-chat',function(res){
      $('#newMsgs').html(res.length)
      if ( res.length == 0 ){
        $('.chat-box').removeClass('new-msg-notification')
      }
    })
  },
  readAll: function(){
    $.post('/notifications/read-all',function(res){
      $('.notificationCount').html('')
      $('a.unread-notifications').removeClass('unread-notifications')
      setTimeout(function(){
        $('.unread').removeClass('unread')
      },5000)
    })
  }
}