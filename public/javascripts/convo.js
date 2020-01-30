var botui = new BotUI('api-bot');

var socket = io.connect('https://tatiana-app-proxy.podivilov.ru');
// read the BotUI docs : https://docs.botui.org/

botui.message.add({
  content: 'Привет! Меня зовут Татьяна. Я — виртуальный ассистент. Чем могу помочь?',
  delay: 1500,
}).then(function () {
  botui.action.text({
    action: {
      placeholder: 'Скажите что-нибудь', }
  }
).then(function (res) {
  socket.emit('fromClient', { client : res.value }); // sends the message typed to server
    console.log(res.value); // will print whatever was typed in the field.
  }).then(function () {
    socket.on('fromServer', function (data) { // recieveing a reply from server.
      console.log(data.server);
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
      placeholder: 'Введите ответ...', 
    }
  }).then(function (res) {
    socket.emit('fromClient', { client : res.value });
    console.log('client response: ', res.value);
  })
}
