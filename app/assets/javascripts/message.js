var MessageEvents = {
  init: function(){
    this.chatListClick()
  },
  chatListClick: function(){
    $('.chat-bar .top-bar').click(function(e){
      e.preventDefault();
      MessageView.toggleChatList();
    })
  }
}

var Message = {
}

var MessageView = {
  toggleChatList: function(){
    $('.chat-box').toggleClass('expanded')
  }
}