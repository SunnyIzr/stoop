var MessageEvents = {
  init: function(){
    this.chatListClick()
    this.convoPreview();
  },
  chatListClick: function(){
    $('.chat-bar .top-bar').click(function(e){
      e.preventDefault();
      MessageView.toggleChatList();
    })
  },
  convoPreview: function(){
    $(document).on('click','a.conversation-preview', function(e){
      e.preventDefault();
      MessageView.loadConvo(this.href)
    })
  }
}

var Message = {
}

var MessageView = {
  toggleChatList: function(){
    $('.chat-box').toggleClass('expanded')
  },
  loadConvo: function(url){
    $.getScript(url,function(res){
      res
    })
  }
  
}