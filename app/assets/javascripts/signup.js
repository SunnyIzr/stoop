Signup = {
  init: function(){
    this.loadBuildings();
    this.toggleSignUp();
  },
  loadBuildings: function(){
    $('select#neighborhood').change(function(){
      $('option.building').addClass('hide')
      $('option.neighborhood-' + $(this).val() ).removeClass('hide')
      $('select').trigger('chosen:updated')
    })
  },
  toggleSignUp: function(){
    $('input[name="type-of-account"]').change(function(){
      if ( $('input[name="type-of-account"]:checked').val() == 'Business' ){
        $('.newUser').addClass('hide');
        $('.newBusiness').removeClass('hide');
      } else {
        $('.newBusiness').addClass('hide');
        $('.newUser').removeClass('hide');
      }
    })
  }
}