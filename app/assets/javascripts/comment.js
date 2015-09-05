var CommentEvents = {
  init: function(){
    this.newLike();
    this.newComment();
    this.newCommentField();
  },
  newCommentField: function(){
    $(document).on('click','.addNewComment',function(e){
      e.preventDefault();
      $commentBar = $(this).closest('.comment-bar')
      postId = $(this).closest('.post').attr('class').split(' ')[1].replace('post-id-','')
      Comment.addCommentField($commentBar,postId)
    })
  },
  newLike: function(){
  },
  newComment: function(){
  }
}

var Comment = {
  getRefresh: function(id){
    //Gets Comment data AND refreshes view
  },
  refresh: function(comment){
    // ONLY refreshes view
  },
  addNew: function(comment){
  },
  addCommentField: function($commentBar,postId){
    $el = $('.comment_field.hide').clone()
    $el.removeClass('hide')
    
    $el.find('input[name="comment[commentable_id]"]').val(postId)
    
    $commentBar.append($el)
  }
}