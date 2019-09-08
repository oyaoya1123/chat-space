$(function() {
  function buildHTML(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                </div>`
    return html;
  }
  function useraddHTML( id , name ) {
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value=${id}>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    return html;
  }
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    var ids = [];
    $('input[name="group[user_ids][]"]').each(function(i) {
      ids[i] = $(this).val();
    });

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input, user_ids: ids },
      dataType: 'json',
    })
    .done(function(users){
      $("#user-search-result").empty();
      if(users.length !== 0){
        users.forEach(function(user){
        var html = buildHTML(user)
        $('#user-search-result').append(html);
        });
      }
    })
    .fail(function(users){
      alert('error');
    })
  });
  $(document).on('click', ".user-search-add" , function() {
    var name = $(this).attr("data-user-name");
    var id = $(this).attr("data-user-id");
    $(this).parent().remove();
    var html = useraddHTML( id,name );
    $('#user-add-result').append(html);
  });
  $(document).on('click', ".user-search-remove" , function() {
    $(this).parent().remove();
  });
});