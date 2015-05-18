$('#action-bold').click(function () {
    document.execCommand('bold', false, null);
});
$('#action-underline').click(function () {
    document.execCommand('underline', false, null);
});
$('#action-italic').click(function () {
    document.execCommand('italic', false, null);
});
$('#action-ol').click(function () {
    document.execCommand('insertOrderedList', null, null);
});
$('#action-ul').click(function () {
    document.execCommand('insertUnorderedList', null, null);
});
$('.styleselect').change(function () {
    document.execCommand('formatBlock', null, $(this).val());
});

$('#submitbutton').click(function () {
    var title = $('#note_title').text();
    var content = $('#note_content').html();
    $.post("/addnote", { title: title, content: content});
});

$('#changebutton').click(function () {
    var title = $('#note_title').text();
    var content = $('#note_content').html();
    $.post(location.href, { title: title, content: content});
});