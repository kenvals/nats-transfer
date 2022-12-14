# Service Reader-Producer - Writer-Consumer (RPWC)

##### Описание
Сервис передачи файлов через NATS. Ограничение для NATS (default) 1mb. На текущий момент реализована передача файлов с помощью чанков:
 - gif / jpeg / png / webp / text
 - работает на NestJS без конкурирующих фреймворков

У NATS системы есть ограничения и поэтому нужно передавать чанками. Простой NATS (не JetStream) не хранит сообщения для повторов при ошибках и не обеспечивает внутреннее подтверждение доставки.


##### Скрин после передачи контента
Слева представлена картинка до передачи и после передачи с помощью  NATS.

 - Картинка размером 1.5mb
![1.5mb](https://github.com/kenvals/nats-transfer/blob/main/images/p2.png)

 - Картинка размером 4.8mb
![4.8mb](https://github.com/kenvals/nats-transfer/blob/main/images/p1.png)

##### Как работает?

**Reader-Producer** осуществляет чтение и передачу данных по заранее выбранному транспорту. 
- NATS

Сервис **Writer-Consumer** принимает данные от брокера заранее выбранного протокола, обрабатывает  их и сохраняет. Под обработкой понимается некая допустимая модификация бинарных данных в чанке (картинка не разрушается, но не обязательно должна выглядеть корректно после модификации).

##### Как запустить?

Использовал: Nodejs v16.17.0.

1. Сделать docker-compose up // чтобы поднять NATS брокер  из docker
2. Добавить в .env (touch .env)

NATS_ADDR=nats://192.168.1.4:4222          //Адрес NATS брокера
MAX_CHUNK=200000                           //Максимальный размер чанка, на который будет делиться файл
GARBAGE_PATH=/Users/kenval/Desktop/temp/   //Куда сохранять файлы

3. sudo node dist/main.js //Запускает скомпилинный проект Nestjs (запускать от sudo нужны права на файловую систему). Для нового билда используйте NestJs npm run build.

4. Как отправить файл?  (Либо используйте Postman)

curl --location --request POST 'http://localhost:3000/reader-producer/upload' \
--form 'file=@"/Users/kenval/Documents/11-0-Day.jpg"'

/Users/kenval/Documents/11-0-Day.jpg - картинка либо текст на компьютере

