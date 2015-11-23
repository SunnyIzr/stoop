var MessageEvents = {
  init: function(){
    this.chatListClick();
    this.conversationClick();
  },
  chatListClick: function(){
    $('.chat-bar .top-bar').click(function(e){
      e.preventDefault();
      MessageView.toggleChatList();
    })
  },
  conversationClick: function(){
    $('.conversation').click(function(e){
      var elementTargeted = $(e.currentTarget)
      var name = elementTargeted.find(".name")[0].innerHTML
      var imageSrc = elementTargeted.find("img")[0].getAttribute("src");
      MessageView.hideConversations()
      MessageView.showConversation()
      MessageView.setConversationValues(name, imageSrc)
    })
  }
}

var Message = {
}

var MessageView = {
  toggleChatList: function(){
    $('.chat-box').toggleClass('expanded')
  },
  hideConversations: function(){
    $(".conversation-options").addClass("inactive")
  },
  showConversations: function(){
    $(".conversation-options").removeClass("inactive")
  },
  showConversation: function(){
    $(".conversation.inactive").addClass("active")
    $(".conversation.inactive").removeClass("inactive")
  },
  setConversationValues: function(name, imageSrc){
    $(".conversation.active").find(".name")[0].innerHTML = name
    $(".conversation.active").find("img").attr("src", imageSrc)
  }
}
