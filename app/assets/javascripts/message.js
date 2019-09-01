function scrollBottom(){
  var position = $('.messages')[0].scrollHeight;
  $('.messages').animate({
    scrollTop: position
  }, 500, 'swing');
}
$(function(){
  function buildHTML(message){
    var img = message.image ? `<img class="message__image" src=${message.image} />` : ``
    var html = `<section class='message' data-id=${message.id} >
                  <div class='message__upper-info'>
                    <p class='message__upper-info__talker'>
                      ${message.name}
                    </p>
                    <p class='message__upper-info__date'>
                      ${message.date}
                    </p>
                  </div>
                  <p class='message__text'>
                    ${message.content}
                  </p>
                  ${img}
                </section>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.new_message')[0].reset();
      scrollBottom();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(data){
      $('.submit-btn').prop('disabled', false);
      alert('error');
    })
  });
  var reloadMessages = function() {
    last_message_id = $('section').last().attr('data-id');
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      $.each(messages, function(index, value){
        insertHTML += buildHTML(value);
      });
      $('.messages').append(insertHTML)
      scrollBottom();
    })
    .fail(function() {
      alert('reload error');
    });
  };
  if($('.messages').length) setInterval(reloadMessages, 5000);
});