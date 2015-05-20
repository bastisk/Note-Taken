$(document).ready(function(){
	context.init({preventDoubleContext: false});
    context.settings({compress: true});
	context.attach('#note_content', [
		{header: 'Styles'},
		{text: '<b>Bold</b>', action: function(e){
            document.execCommand('bold', false, null);
        }},
        {text: '<i>Italic</i>', action: function(e){
            document.execCommand('italic', false, null);
        }},
        {text: '<u>Underline</u>', action: function(e){
            document.execCommand('underline', false, null);
        }},
        {text: 'Paragraphs', subMenu: [
			{header: 'Paragraphs'},
			{text: 'Headline 2', action: function(e){
                document.execCommand('formatBlock', null, '<h1>');
            }},
            {text: 'Headline 2', action: function(e){
                document.execCommand('formatBlock', null, '<h2>');
            }},
            {text: 'Headline 3', action: function(e){
                document.execCommand('formatBlock', null, '<h3>');
            }},
            {text: 'Headline 4', action: function(e){
                document.execCommand('formatBlock', null, '<h4>');
            }},
            {text: 'Paragraph', action: function(e){
                document.execCommand('formatBlock', null, '<p>');
            }},
            {text: 'Preformatted', action: function(e){
                document.execCommand('formatBlock', null, '<pre>');
            }} ]},
        {text: 'unordered list', action: function(e){
            document.execCommand('insertUnorderedList', null, null);
        }},
        {text: 'ordered list', action: function(e){
            document.execCommand('insertOrderedList', null, null);
        }}
	]);
    
	$(document).on('mouseover', '.me-codesta', function(){
		$('.finale h1:first').css({opacity:0});
		$('.finale h1:last').css({opacity:1});
	});
    
	$(document).on('mouseout', '.me-codesta', function(){
		$('.finale h1:last').css({opacity:0});
		$('.finale h1:first').css({opacity:1});
	});
	
});