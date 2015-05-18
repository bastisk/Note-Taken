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
    var demo_text = $('#note_content').text().substring(0, 200);
    $.post("/addnote", { title: title, content: content, demo_text: demo_text});
    alert("Note saved.");
    document.location.replace("/");
});

$('#changebutton').click(function () {
            var title = $('#note_title').text();
            var content = $('#note_content').html();
            var demo_text = $('#note_content').text().substring(0, 200);
            $.post(location.href, { Title: title, Text: content, demo_text: demo_text});
            alert("Note changed.");
            document.location.replace("/");
});
$('#deletebutton').click(function () {
            var id = $("#deletebutton").val();
            $.post("/deletenote", { _id: id});
            alert("Note removed.");
            document.location.replace("/");
});