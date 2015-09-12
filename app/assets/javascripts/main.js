$(document).ready(function(){
  PostEvents.init();
  CommentEvents.init();
  FollowEvents.init();
  MessageEvents.init();
  Signup.init();
  
  $('.editable').editable()
  
  $(document).on('click', 'a.loadScript', function(e){
    e.preventDefault();
    $.getScript(this.href,function(res){
      res
    })
  })
  
  
  $('.clickable-row').click(function(){
    window.location.href = $(this).data('target')
  })
  
  //Dropzone
  postDropzone = Dropzone.options.newPost = {
    paramName: "post[image]", // The name that will be used to transfer the file
    maxFilesize: 2, // MB
    autoProcessQueue: false,
    init: function() {

      // Limit to only uploading 1 file
      this.on("addedfile", function() {
        if (this.files[1]!=null){
          this.removeFile(this.files[0]);
        }
      });
      
      // Upload file only when user initiates
      var submitButton = document.querySelector("#submit-image-post")
          myDropzone = this; // closure

      submitButton.addEventListener("click", function(e) {
        e.preventDefault();
        myDropzone.processQueue(); // Tell Dropzone to process all queued files.
      });

      // You might want to show the submit button only when 
      // files are dropped here:
      this.on("addedfile", function() {
        // Show submit button here and/or inform user to click it.
      });
      
      this.on("success", function(file, responseText) {
            $('.text-area').val('')
            myDropzone.removeAllFiles();
            Post.addNew(responseText)
      });

    },
    accept: function(file, done) {
      done();
    }
  };
  
  profilePicDropzone = Dropzone.options.newProfilePic = {
    paramName: "user[avatar]", // The name that will be used to transfer the file
    maxFilesize: 2, // MB
    init: function() {

      // Limit to only uploading 1 file
      this.on("addedfile", function() {
        if (this.files[1]!=null){
          this.removeFile(this.files[0]);
        }
      });
      
      this.on("success", function(file, responseText) {
        setTimeout(function(){
          location.reload()
        },2000)
      });

    },
    accept: function(file, done) {
      done();
    }
  };
  
  coverPicDropzone = Dropzone.options.newCoverPic = {
    paramName: "user[cover]", // The name that will be used to transfer the file
    maxFilesize: 2, // MB
    init: function() {

      // Limit to only uploading 1 file
      this.on("addedfile", function() {
        if (this.files[1]!=null){
          this.removeFile(this.files[0]);
        }
      });
      
      this.on("success", function(file, responseText) {
        setTimeout(function(){
          location.reload()
        },2000)
      });

    },
    accept: function(file, done) {
      done();
    }
  };
})