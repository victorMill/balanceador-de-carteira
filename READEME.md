# Balanceador de Carteiras 1.0.0

Programa criado com o objetivo de praticar conhecimentos do curso de JavaScript. Principais conceitos usados: promises, consumo de APIs, modularização, POO, CSS e HTML.

O programa é uma carteira de ações e FIIs que grava no servidor a quantidade de ativos que o cliente possui e permite que seja atribuída uma nota para cada ativo. Com base na nota, o app indica qual é a participação ideal que o ativo deveria ter na carteira. É possível adicionar novos ativos, editar e deletar ativos e, mais importante, definir um valor para investimento que será rateado entre os 3 ativos com menor participação atual e maior participação ideal.

O programa usa o jsonbin.io como simples servidor JSON e o brapi.dev para buscar os preços dos ativos na bolsa de valores.

## Changelog

- Adiciona acesso ao servidor jsonbin.io
- Separa as páginas de FIIs e Ações, cada uma com sua DB separada
- Correção de vários bugs

## Usando o jsonbin.io

O usuário deverá cadastrar uma conta no site jsonbin.io, criar duas bins, uma para ações e uma para FIIs. Cada bin é um arquivo JSON que terá um Bin ID. Deve obter também uma X-Master-Key, que é a chave que permite acesso aos arquivos JSON.

Deverá inserir as informações nas funções `readDb()` e `updateDB()` dos arquivos `./modules/fiis/create_asset.js` e `./modules/stocks/create_asset.js`.

## Usando o brapi.dev

O usuário deverá cadastrar uma conta no site brapi.dev e obter um token. O token deverá ser inserido na função `requestAssetPrice(ticker)` dos arquivos `./modules/stock/create_asset.js` e `./modules/fiis/create_asset.js`.

## Próximos passos

- O jsonbin não permite que o arquivo JSON fique em branco, então o usuário não consegue apagar todos os ativos. Criar uma condicional para que o arquivo seja preenchido com um dummy se todos os ativos forem apagados.
- Adicionar uma opção frontend para inserção dos dados do servidor.

---