  $('.dropzone').on('dragover', function (evt) {
      evt.preventDefault();
  });

  $('.dropzone').on('dragenter', function () {
      $(this).addClass('valid');
      evt.preventDefault();
  });

  $('.dropzone').on('dragleave', function () {
      $(this).removeClass('valid');
  });

  $('.dropzone').on('drop', function (evt) {
      evt.preventDefault();
      document.getElementById("drop").appendChild(document.getElementById(evt.originalEvent.dataTransfer.getData('text')));
  });
  $('tr').on('dragstart', function (evt) {
      evt.originalEvent.dataTransfer.setData('text', evt.target.id);
  });

  $('tr').on('drag', function (evt) {
      console.log('Drag');
  });

  $('tr').on('dragend', function (evt) {
      console.log('Ende');
  });