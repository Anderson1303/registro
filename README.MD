
# REGISTRO AUSENTES

Este sistema tem por objetivo registrar os pacientes que faltaram a consulta e enviar um SMS para o mesmo.

## ESTRUTURA DO PROJETO

**Api**  - Pasta que contem a API da aplicação (Desenvolvido em C# com .Net)

**frontend**  - Pasta com a interface acessada pelos usuários (Desenvolvida em React)

## COMANDOS

**APP - API**

Para iniciar a API em ambiente de desenvolvimento, rodar o comando abaixo dentro da pasta  _Api/src/App_:

```sh
dotnet run

```

**FRONTEND**

Para rodar a interface de usuário em ambiente de desenvolvimento, executar o comando abaixo dentro da pasta  _frontend_:

```sh
npm start

```

Para compilar o pacote final para deploy no servidor rodar o comando abaixo dentro da pasta  _frontend_:

```sh
npm run build
```