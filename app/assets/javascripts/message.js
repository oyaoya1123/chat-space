function scrollBottom(){
  var position = $('.messages')[0].scrollHeight;
  $('.messages').animate({
    scrollTop: position
  }, 500, 'swing');
}
$(function(){
  function buildHTML(message){
    var img = message.image ? `<img class="message__image" src=${message.image} />` : ``
    var html = `<div class='message'>
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
                </div>`
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
});