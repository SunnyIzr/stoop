var StoopPrivatePub = {
  init: function(){
    this.subscribeToNewMessages(),
    this.subscribeToNewConversations()
  },
  subscribeToNewMessages: function(){
    var userId = $(".user-server-id").html()
    var message_route = ("/messages/new/" + userId).replace(/\s/g, "");
    PrivatePub.subscribe(message_route, function(data, channel) {
      window.myData = data
      alert('new')
      var messagesElement = $(".conversation-messages")
      if (!messagesElement.hasClass("hidden") && messagesElement.is("#" + data.conversation_id)){
        var sender_status = "received_by_user";
        var body = data.chat_message;
        MessageView.addNewMessageToMessageList(sender_status, body)
        MessageView.moveConversationToTopOfConversationList(data.conversation_id)
      } else {
        MessageView.changeTopBarColor("green")
        MessageView.highlightNotifications()
      }
    });
  },
  subscribeToNewConversations: function(){
    var userId = $(".user-server-id").html()
    var message_route = ("/conversations/new/" + userId).replace(/\s/g, "");
    PrivatePub.subscribe(message_route, function(data, channel) {
      var args = {
        conversationId: data.conversation.id,
        avatar: data.user.avatar  || "default-avatar.png",
        name: data.user.name || ""
      };
      MessageView.addNewConversationToConversationList(args);
      MessageEvents.conversationClick();
      MessageView.changeTopBarColor("green");
      MessageView.highlightNotifications()
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
    this.submitNewMessageEnterButton()
    this.newMessage();
    this.submitNewConversationEnterButton();
  },
  chatListClick: function(){
    $('.chat-bar .top-bar').click(function(e){
      e.preventDefault();
      if ($(".back-button").hasClass("inactive")){
        MessageView.changeTopBarColor("#345064");
        MessageView.deHighlightNotifications()
        MessageView.toggleChatList();
      } else if ( !$(".conversation-list").hasClass("hidden") ){
        MessageView.hideBackButton()
        MessageView.removeNameOnHead()
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
    $('.conversation-single').click(function(e){
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
      MessageView.hideConversationMessages()
      MessageView.showConversations();
      MessageView.hideNewConversation();
      MessageView.showNewConversationButton()
      MessageView.cleanConversationMessages()
    })
  },
  submitNewConversationButton: function(){
    var that = this;
    $(".submit-new-conversation-button").click(function(e){
      var userId = $(".conversation-new")[0].id
      var body = $("#new-conversation-text").val()
      var name = $(".conversation-new").find(".name")[0].innerHTML
      var avatar  = $(".conversation-new").find("img").attr("src")
      $.post( "/messages", {recipients: userId, message: {body: body}}, function( data ) {
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
      $.post( "/messages", {convo_id: convoId, message: {body: body}}, function( data ) {
        var message = data[0];
        MessageView.addNewMessageToMessageList(sender_status, body)
        MessageView.moveConversationToTopOfConversationList(convoId)
      });
      $("#new-message-text").val("")
    })
  },
  submitNewMessageEnterButton: function(){
    $('#new-message-text').keyup(function(e){
      if ( e.which == 13 ){
        var convoId = $(".conversation-messages")[0].id
        var body = $("#new-message-text").val()
        var sender_status = "sent_by_user"
        $.post( "/messages", {convo_id: convoId, message: {body: body}}, function( data ) {
          var message = data[0];
          MessageView.addNewMessageToMessageList(sender_status, body)
          MessageView.moveConversationToTopOfConversationList(convoId)
        });
        $("#new-message-text").val("")
      }
    })
  },
  submitNewConversationEnterButton: function(){
    var that = this
    $('#new-conversation-text').keyup(function(e){
      if ( e.which == 13 ){
        var userId = $(".conversation-new")[0].id
        var body = $("#new-conversation-text").val()
        var name = $(".conversation-new").find(".name")[0].innerHTML
        var avatar  = $(".conversation-new").find("img").attr("src")
        $.post( "/messages", {recipients: userId, message: {body: body}}, function( data ) {
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
      }
    })
  },
  newMessage: function(){
    $('.newMessage').click(function(e){
      e.preventDefault();
      Conversation.openNew($(this).data('user-id'))
    })
  }
}

var Conversation = {
  openNew: function(userId){
    $.getJSON('/get-conversation/' + userId,function(res){
      if ( res.conversation == null ){
        MessageView.hideConversations()
        MessageView.setNewConversationValues(res.cpty.first_name + ' ' + res.cpty.last_name, res.avatar, res.cpty.id)
        MessageView.showNewConversation()
        MessageView.showBackButton()
        MessageView.toggleChatList();
      } else {
        convoId = res.conversation.id
        Conversation.open(convoId,'conversationsOpen')
      }
    })
  },
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
        $('.conversation-messages-list').prepend("<div class='msg-container'><div class='" + sender_status + "'>"+ v.body +"</div><div class='clear'></div></div>");
      });
      if (type == "conversationsOpen"){
        // when opening an existing conversation do this
        MessageView.hideNewConversationButton()
        MessageView.hideConversations()
        MessageView.toggleChatList();
      } else if (type == "conversations"){
        // when opening an existing conversation do this
        MessageView.hideNewConversationButton()
        MessageView.hideConversations()
      } else if (type == "newConversation"){
        // after creating a new conversation do this
        MessageView.hideNewConversation()
      }
      window.myData = data
      $(".conversation-messages").attr("id", id)
      MessageView.showConversationMessages()
      MessageView.showBackButton()
      MessageView.addNameToHead(data.other_partcipant.first_name + ' ' + data.other_partcipant.last_name)
      MessageView.scrolltoBottomOfChatBox();
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
  highlightNotifications: function(){
    $('.chat-box').addClass('new-msg-notification')
    if ( $('#newMsgs').html() == '' ){
      currentNumber = 0
    } else {
      currentNumber = parseInt($('#newMsgs').html())
    }
    $('#newMsgs').html(currentNumber += 1)
  },
  deHighlightNotifications: function(){
    $('.chat-box').removeClass('new-msg-notification')
    $('#newMsgs').html('')
  },
  hideBackButton: function(){
    $(".back-button").addClass("inactive")
    $(".back-button").removeClass("active")
  },
  showBackButton: function(){
    $(".back-button").addClass("active")
    $(".back-button").removeClass("inactive")
  },
  addNameToHead: function(name){
    $('.chat-box').addClass('single-chat')
    $('.recipient_name').html(name)
  },
  removeNameOnHead: function(){
    $('.chat-box').removeClass('single-chat')
    $('.recipient_name').html('')
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
  },
  moveConversationToTopOfConversationList: function(conversationId){
    $(".conversation-list").find("#" + conversationId).prependTo($(".conversation-list"))
  },
  addNewMessageToMessageList: function(sender_status, body){
    $('.conversation-messages-list').append("<div class='msg-container'><div class='" + sender_status + "'>"+ body +"</div><div class='clear'></div></div>");
    MessageView.scrolltoBottomOfChatBox();
  },
  scrolltoBottomOfChatBox: function(){
    $(".chat-box").scrollTop($(".chat-box")[0].scrollHeight);
  }
}
