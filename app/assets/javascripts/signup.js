Signup = {
  init: function(){
    this.loadBuildings();
  },
  loadBuildings: function(){
    $('select#neighborhood').change(function(){
      $('option.building').addClass('hide')
      $('option.neighborhood-' + $(this).val() ).removeClass('hide')
      $('select').trigger('chosen:updated')
    })
  }
}