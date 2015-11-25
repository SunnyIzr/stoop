var StoopPrivatePub = {
  init: function(){
    this.subscribeToNewMessages(),
    this.subscribeToNewConversations()
  },
  subscribeToNewMessages: function(){
    var userId = $(".user-server-id").html()
    var message_route = ("/messages/new/" + userId).replace(/\s/g, "");
    PrivatePub.subscribe(message_route, function(data, channel) {
      console.log("got message")
      console.log(data)
      console.log(channel)
      MessageView.changeTopBarColor("green")
    });
  },
  subscribeToNewConversations: function(){
    var userId = $(".user-server-id").html()
    var message_route = ("/conversations/new/" + userId).replace(/\s/g, "");
    PrivatePub.subscribe(message_route, function(data, channel) {
      console.log("got conversation")
      console.log(data)
      console.log(channel)
      var args = {
        conversationId: data.conversation.id,
        avatar: data.user.avatar  || "/assets/default-avatar.png",
        name: data.user.name || ""
      };
      MessageView.addNewConversationToConversationList(args);
      MessageEvents.conversationClick();
      MessageView.changeTopBarColor("green");
    });
  }
}

var MessageEvents = {
  init: function(){
    StoopPrivatePub.init()
    this.chatListClick();
    this.conversationClick();
    this.submitNewMessageButtonClicked();
    this.submitNewConversationButton();
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
        Conversation.open(convoId, "conversations")
      }
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
      } else if (!$(".conversation-messages").hasClass("hidden")){
        MessageView.hideConversationMessages()
        MessageView.showConversations();
        MessageView.showNewConversationButton()
        MessageView.cleanConversationMessages()
      } else {
        MessageView.hideConversation();
        MessageView.showConversations();
      }
    })
  },
  submitNewConversationButton: function(){
    var that = this;
    $(".submit-new-conversation-button").click(function(e){
      var userId = $(".conversation-new")[0].id
      var body = $("#new-conversation-text").val()
      var name = $(".conversation-new").find(".name")[0].innerHTML
      var avatar  = $(".conversation-new").find("img").attr("src")
      $.post( "messages", {recipients: userId, message: {body: body}}, function( data ) {
          var message = data[0];
          var args = {
            conversationId: message.conversation_id,
            avatar: avatar,
            name: name
          };
          MessageView.addNewConversationToConversationList(args);
          that.conversationClick();
          $("#new-conversation-text").val = "";
          Conversation.open(message.conversation_id, "newConversation")
      });
    })
  },
  submitNewMessageButtonClicked: function(){
    $(".submit-message-button").click(function(e){
      var convoId = $(".conversation-messages")[0].id
      var body = $("#new-message-text").val()
      var sender_status = "sent_by_user"
      $.post( "messages", {convo_id: convoId, message: {body: body}}, function( data ) {
        var message = data[0];
        $('.conversation-messages-list').append("<div class='" + sender_status + "'>"+ body +"</div>");
      });
      $("#new-message-text").val("")
    })
  }
}

var Conversation = {
  open: function(id, type){
    $.get("/conversations/" + id, function( data ) {
      var user = data.user;
      $.each(data.messages, function(k, v) {
        var sender_status;
        if (v.sender_id == user.id){
          sender_status = "sent_by_user"
        } else {
          sender_status = "received_by_user"
        }
        $('.conversation-messages-list').prepend("<div class='" + sender_status + "'>"+ v.body +"</div>");
      });
      if (type == "conversations"){
        // when opening an existing conversation do this
        MessageView.hideNewConversationButton()
        MessageView.hideConversations()
      } else if (type == "newConversation"){
        // after creating a new conversation do this
        MessageView.hideNewConversation()
      }
      $(".conversation-messages").attr("id", id)
      MessageView.showConversationMessages()
      MessageView.showBackButton()
    });
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
  changeTopBarColor: function(color){
    $(".top-bar").css("background-color", color);
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
    $(".conversation-messages").removeClass("hidden")
  },
  hideConversationMessages: function(){
    $(".conversation-messages").addClass("hidden")
  },
  cleanConversationMessages: function(){
    $(".conversation-messages-list").empty();
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
  },
  addNewConversationToConversationList: function(args){
    $(".conversation-list")[0].insertAdjacentHTML('afterbegin', "<div class='conversation' id=" + args.conversationId + "> <a href='#'><img class='img-responsive' src='" + args.avatar + "'><p class='name'>" + args.name + "</p></a></div>")
  }
}
