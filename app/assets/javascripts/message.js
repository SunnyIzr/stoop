var MessageEvents = {
  init: function(){
    this.chatListClick();
    this.conversationClick();
    this.submitNewMessageButtonClicked();
    this.newConversationButtonClick();
    this.backButtonClick();
  },
  chatListClick: function(){
    $('.chat-bar .top-bar').click(function(e){
      e.preventDefault();
      if ($(".back-button").hasClass("inactive")){
      //if (!$(".chat-box").hasClass("expanded") || $(".conversation.active").length > 0){
        MessageView.toggleChatList();
      } else if ( !$(".conversation-list").hasClass("hidden") ){
        MessageView.hideBackButton()
      }
    })
  },
  newConversationButtonClick: function(){
    $(".new-conversation-button").click(function(e){
      MessageView.hideConversations();
      MessageView.hideNewConversationButton()
      MessageView.showBuildingMemberList()
      MessageView.showBackButton()
    })
  },
  conversationClick: function(){
    $('.conversation').click(function(e){
      var elementTargeted = $(e.currentTarget)
      var closestConversation = elementTargeted.closest(".conversation")[0]
      if (elementTargeted.hasClass("building-member")){
        var name = elementTargeted.find(".name")[0].innerHTML
        var imageSrc = elementTargeted.find("img")[0].getAttribute("src");
        var userId = closestConversation.id
        MessageView.setNewConversationValues(name, imageSrc, userId)
        MessageView.showNewConversation()
        MessageView.hideBuildingMemberList()
      } else {
        var convoId = closestConversation.id
        //$.get("/conversations/" + convoId, function( data ) {
        //  $.each(data.messages, function(k, v) {
        //    $('.conversation-messages.messages').append('<div>'+ v.body +'</div>');
        //  });
        //});
      }
//      // nasty; won't scale well
//      MessageView.showConversationMessages()
//      var closestMessages = elementTargeted.find(".conversation-messages.active")[0]
//      $(closestMessages).height("383px")
      //MessageView.hideConversations()
      //MessageView.showConversation()
    })
  },
  backButtonClick: function(){
    $(".back-button").click(function(e){
      if ( !$(".building-member-list").hasClass("hidden") ){
        MessageView.hideBuildingMemberList();
        MessageView.showConversations();
        MessageView.showNewConversationButton();
      } else if (!$(".conversation-new").hasClass("hidden")){
        MessageView.hideNewConversation();
        MessageView.showBuildingMemberList();
      } else {
        MessageView.hideConversation();
        MessageView.showConversations();
      }
    })
  },
  submitNewMessageButtonClicked: function(){
    $(".submit-message-button").click(function(e){
      var userId = $(".conversation-new")[0].id
      var body = $("#new-message-text").val()
      var name = $(".conversation-new").find(".name")[0].innerHTML
      var avatar  = $(".conversation-new").find("img").attr("src")
      $.post( "messages", {recipients: userId, message: {body: body}}, function( data ) {
          var message = data[0];
          $(".conversation-list")[0].insertAdjacentHTML('beforeend', "<div class='conversation' id=" + message.conversation_id + "> <a href='#'><img class='img-responsive' src='" + avatar + "'><p class='name'>" + name + "</p></a></div>")
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
    $(".conversation-list").addClass("hidden");
  },
  showConversations: function(){
    $(".conversation-list").removeClass("hidden")
  },
  showConversation: function(){
    $(".conversation.inactive").addClass("active")
    $(".conversation.inactive").removeClass("inactive")
  },
  hideConversation: function(){
    $(".conversation.active").addClass("inactive")
    $(".conversation.active").removeClass("active")
  },
  showConversationMessages: function(){
    $(".conversation-messages.inactive").addClass("active")
    $(".conversation-messages.inactive").removeClass("inactive")
  },
  hideConversationMessages: function(){
    $(".conversation-messages.active").addClass("inactive")
    $(".conversation-messages.active").removeClass("active")
  },

  showNewConversation: function(){
    $(".conversation-new").removeClass("hidden")
  },
  hideNewConversation: function(){
    $(".conversation-new").addClass("hidden")
  },
  setNewConversationValues: function(name, imageSrc, id){
    $(".conversation-new").attr("id", id)
    $(".conversation-new").find(".name")[0].innerHTML = name
    $(".conversation-new").find("img").attr("src", imageSrc)
  },
  showNewConversationButton: function(){
    $(".new-conversation-button").removeClass("hidden")
  },
  hideNewConversationButton: function(){
    $(".new-conversation-button").addClass("hidden")
  },
  hideBuildingMemberList: function(){
    $(".building-member-list").addClass("hidden")
  },
  showBuildingMemberList: function(){
    $(".building-member-list").removeClass("hidden")
  }
}
