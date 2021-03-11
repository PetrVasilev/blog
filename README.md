**Запуск клиента**

```
cd client
yarn install
yarn start
```

Убедитесь, что в package.json присутствует

```
"proxy": "http://localhost:3000"
```

**Запуск сервера**

```
cd server
```

Создать файл **.env** с содержимым:

```
PORT=3000
MONGO_DB=mongodb://localhost:27017/blogs
TOKEN_SECRET=tokensecret
```

```
yarn install
yarn start
```

**Тестирование**

```
yarn test
```
