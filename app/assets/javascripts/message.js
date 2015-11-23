var MessageEvents = {
  init: function(){
    this.chatListClick();
    this.conversationClick();
    this.submitMessageButtonClicked();
    this.backButtonClick();
  },
  chatListClick: function(){
    $('.chat-bar .top-bar').click(function(e){
      e.preventDefault();
      if (!$(".chat-box").hasClass("expanded") || $(".conversation.active").length > 0){
        MessageView.toggleChatList();
      }
    })
  },
  conversationClick: function(){
    $('.conversation').click(function(e){
      var elementTargeted = $(e.currentTarget)
      var userId = elementTargeted.closest(".conversation")[0].id
      console.log(userId)
      var name = elementTargeted.find(".name")[0].innerHTML
      var imageSrc = elementTargeted.find("img")[0].getAttribute("src");
      MessageView.hideConversations()
      MessageView.showConversation()
      MessageView.setConversationValues(name, imageSrc, userId)
    })
  },
  backButtonClick: function(){
    $(".back-button").click(function(e){
      console.log("clicked back button")
      MessageView.hideConversation();
      MessageView.showConversations();
    })
  },
  submitMessageButtonClicked: function(){
    $(".submit-message-button").click(function(e){
      var userId = $(".conversation.active")[0].id
      var body = $("textarea").last().val()
      $.post( "messages", {recipients: userId, message: {body: body}}, function( data ) {
        console.log("worked")
        console.log(data)
      });
    })
  }
}

var Message = {
}

var MessageView = {
  toggleChatList: function(){
    $('.chat-box').toggleClass('expanded')
    if (!$(".chat-box").hasClass("expanded")){
      this.hideConversation();
      this.showConversations();
    }
  },
  hideBackButton: function(){
    $(".back-button").addClass("inactive")
    $(".back-button").removeClass("active")
  },
  showBackButton: function(){
    $(".back-button").addClass("active")
    $(".back-button").removeClass("inactive")
  },
  hideConversations: function(){
    $(".conversation-options").addClass("inactive");
    this.showBackButton();
  },
  showConversations: function(){
    $(".conversation-options").removeClass("inactive")
    this.hideBackButton();
  },
  showConversation: function(){
    $(".conversation.inactive").addClass("active")
    $(".conversation.inactive").removeClass("inactive")
  },
  hideConversation: function(){
    $(".conversation.active").addClass("inactive")
    $(".conversation.active").removeClass("active")
  },
  setConversationValues: function(name, imageSrc, userId){
    $(".conversation.active").attr("id", userId)
    $(".conversation.active").find(".name")[0].innerHTML = name
    $(".conversation.active").find("img").attr("src", imageSrc)
  }
}
