# CEP API - Consulta de Endereços

API RESTful desenvolvida com NestJS para consulta de endereços através do CEP (Código de Endereçamento Postal).

## 🚀 Funcionalidades

- Consulta de endereços por CEP
- Validação de formato do CEP
- Tratamento de erros para CEPs inválidos ou não encontrados
- Logs de monitoramento
- Testes automatizados
- Configuração via variáveis de ambiente

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://seu-repositorio/cep-api.git
cd cep-api
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🔍 Como usar

### Consultar endereço por CEP

```http
GET /cep/{cep}
```

Exemplo:
```bash
curl http://localhost:3000/cep/01001000
```

Resposta de sucesso:
```json
{
  "cep": "01001-000",
  "logradouro": "Praça da Sé",
  "complemento": "lado ímpar",
  "bairro": "Sé",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "gia": "1004",
  "ddd": "11",
  "siafi": "7107"
}
```

### Códigos de Erro

- `400`: CEP inválido (formato incorreto)
- `404`: CEP não encontrado
- `500`: Erro interno do servidor

## ⚙️ Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento
- `npm run build`: Compila o projeto
- `npm run start`: Inicia o servidor em modo de produção
- `npm test`: Executa os testes
- `npm run test:watch`: Executa os testes em modo watch
- `npm run test:cov`: Gera relatório de cobertura de testes

## 📊 Monitoramento

A API possui logs de monitoramento que registram:
- Requisições recebidas
- Tempo de resposta
- Erros e exceções
- Status das respostas

Os logs são formatados para fácil análise e podem ser integrados com ferramentas de monitoramento.

## 🛠️ Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [Axios](https://axios-http.com/)
- [Winston](https://github.com/winstonjs/winston)
- [Jest](https://jestjs.io/)

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.