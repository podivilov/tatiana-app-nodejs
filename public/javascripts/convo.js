var botui = new BotUI('api-bot');

var socket = io.connect('https://ws.podivilov.ru');
// read the BotUI docs : https://docs.botui.org/

botui.message.add({
  content: 'Привет!',
  delay: 1500,
}).then(function () {
  botui.message.add({
  content: 'Меня зовут Татьяна и я &mdash; виртуальный ассистент &#128129;',
  delay: 2000,
})}).then(function () {
  botui.message.add({
  content: 'Я работаю в ГБПОУ МО &laquo;Колледж &laquo;Коломна&raquo; &#128188;',
  delay: 3500,
})}).then(function () {
  botui.message.add({
  content: 'С радостью отвечу на все ваши вопросы!',
  delay: 5000,
})}).then(function () {
  botui.action.text({
    action: {
      placeholder: 'Чем я могу вам помочь?', }
  }
).then(function (res) {
  socket.emit('fromClient', { client : res.value }); // sends the message typed to server
    console.log('Вы сказали:', res.value); // will print whatever was typed in the field.
  }).then(function () {
    socket.on('fromServer', function (data) { // recieveing a reply from server.
      console.log("Татьяна ответила:",data.server);
      newMessage(data.server);
      addAction();
  })
});
})

function newMessage (response) {
  botui.message.add({
    type: 'html',
    content: response,
    delay: 0,
  })
}

function addAction () {
  botui.action.text({
    action: {
      placeholder: 'Что-нибудь ещё?',
    }
  }).then(function (res) {
    socket.emit('fromClient', { client : res.value });
    console.log('Вы сказали:', res.value);
  })
}
