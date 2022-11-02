# API: Food Facts Viewer - NodeJs Challenge 20201030

## :clipboard: Descrição

O projeto tem como objetivo dar suporte a uma equipe de nutricionistas para que eles possam revisar de maneira rápida a informação nutricional dos alimentos que os usuários publicam pela aplicação móvel do Open Food Facts.

---

## :computer: Técnologias e Conceitos

- REST API
- Node.js
- MongoDB
- Express
- TypeScript
- CRON
- Swagger
- Jest

---

## 🏁 Rodando a aplicação

Dentro da pasta desse projeto, inicie pela instalação das dependências pelo comando:

```yml
npm install
```

Terminado a instalação, crie um arquivo `.env` seguindo o formato fornecido no `.env-example`.

Para utilizar a API em modo de desenvolvimento, utilize o comando:

```yml
npm run dev
```

que irá inicializar a aplicação em modo de desenvolvimento. De modo que a url [http://localhost:4000](http://localhost:4000) irá se tornar o endereço base da api e onde poderá ser feita as requisições das diferentes rotas.

Para criar a aplicação em formato de produção. Utilize o comando:

```yml
npm run build
```

Ele irá criar os arquivos de produção na pasta `/dist`. Que poderão ser executados por meio do comando:

```yml
npm start
```

inicializando a aplicação.

Na primeira inicialização da API conectada à um banco de dados vazio, a liberação de sua porta para fazer as requisições pode demorar um pouco, pois ela irá popular o banco de dados buscando os produtos no Open Food Facts e enviando ao banco de dados.

Por fim, a API atualiza o banco de dados todos os dias as 3:00. Esse padrão pode ser alterado na função CronJob situada no arquivo `app.ts` .

Em relação aos teste, é necessário criar um arquivo `.env.test` que tem o mesmo formato do arquivo `.env-example` e adicionar a ele a URL do banco de dados para os testes. Após isso é só utilizar o comando:

```yml
npm run test
```

para executar os testes vinculados a API.

---

## :rocket: Routes

```yml
GET /
    - Rota responsável por trazer as informações da API
    - headers: {}
    - body: {}
    - response: {
        "databaseConnection": "Ok!", # Estado da conexão entre a API e o banco de dados
        "CRONTime": "2022-11-01T23:10:31.009Z", # Data da última atualização do banco de dados
        "serverUptime": 120.455864174, # Tempo em que a API está online em segundos
        "memoryUsage": "193.96 MB" # uso de memória que a API está consumindo
    }
```

```yml
GET /products
    - Rota responsável por obter todos os itens da Open Food Fact persistidos no banco de dados sem ter o status de "trash" por paginação
    - parameters: {
        - query: page  # Opcional
    }
    - headers: {}
    - body: {}
    - response: [
        {
          "_id": "string",
          "code": "string",
          "status": "string",
          "imported_t": "string",
          "url": "string",
          "creator": "string",
          "created_t": 0,
          "last_modified_t": 0,
          "product_name": "string",
          "quantity": "string",
          "brands": "string",
          "categories": "string",
          "labels": "string",
          "cities": "string",
          "purchase_places": "string",
          "stores": "string",
          "ingredients_text": "string",
          "traces": "string",
          "serving_size": "string",
          "serving_quantity": 0,
          "nutriscore_score": 0,
          "nutriscore_grade": "string",
          "main_category": "string",
          "image_url": "string"
        }
    ]
```

```yml
GET /products/:code
    - Rota responsável por obter os dados de um item da Open Food Fact persistido no banco de dados pelo seu código
    - headers: {}
    - body: {}
    - response: {
        "_id": "string",
        "code": "string",
        "status": "string",
        "imported_t": "string",
        "url": "string",
        "creator": "string",
        "created_t": 0,
        "last_modified_t": 0,
        "product_name": "string",
        "quantity": "string",
        "brands": "string",
        "categories": "string",
        "labels": "string",
        "cities": "string",
        "purchase_places": "string",
        "stores": "string",
        "ingredients_text": "string",
        "traces": "string",
        "serving_size": "string",
        "serving_quantity": 0,
        "nutriscore_score": 0,
        "nutriscore_grade": "string",
        "main_category": "string",
        "image_url": "string"
    }
```

```yml
PUT /products/:code
    -  Rota responsável por poder alterar algumas informações do produto persistido no banco de dados pelo seu código
    - headers: {}
    - body: {
        "categories": "string",
        "ingredients_text": "string",
        "traces": "string",
        "nutriscore_grade": "string",
        "nutriscore_score": 0,
        "status": "published" | "draft"
    }
    - Os campos no body dessa requisição são todos opcionais
```

```yml
DELETE /products/:code
    -  Rota responsável por deletar um produto persistido no banco de dados
    - headers: {}
    - body: {}
```
