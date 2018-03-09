var userFeed = new Instafeed({
  get: 'user',
  userId: '291620298',
  limit: 12,
  resolution: 'standard_resolution',
  accessToken: '291620298.1677ed0.d40e37107a6b4e23b8f21aae39cf09f7',
  sortBy: 'most-recent',
  template: '<div class="col-md-3 instaimg"><a href="{{image}}" title="{{caption}}" target="_blank"><img src="{{image}}" alt="{{caption}}" class="img-fluid"/></a></div>',
});
userFeed.run();


$('.gallery').magnificPopup({
  type: 'image',
  delegate: 'a',
  gallery:{
    enabled:true
  }
});