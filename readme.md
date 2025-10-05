# 🐶 🐱 Carteira de Vacinação de Pets 🐾 💉 

## Descrição

Uma aplicação web para gerenciar o histórico de imunização dos bichinhos de estimação! Utilizado Node.js, Express, Typescript, e PostgreSQL. Tentei aplicar conceitos aprendidos de Arquitetura limpa e DDD, e também conta com testes unitários.


## Requisitos Funcionais 

- O usuário deve poder cadastrar um ou mais pets
- O usuário deve poder registrar vacinações para o pet selecionado
- O usuário deve poder ver as vacinações registradas do pet selecionado
- O usuário deve poder ver quais são as próximas doses de reforço que o pet selecionado deve tomar
- O usuário deve poder ver quais vacinas o pet não precisa mais tomar

## Tecnologias Utilizadas

- **Node.js**
- **Typescript**
- **Express**
- **PostgreSQL**



## Documentação da API


### Tecnologias  
✅ Node.js • ✅ Typescript • ✅ Express • ✅ PostgreSQL 

### Endpoints

| Método | Rota                  | Ação                | Body/Params                      | Status        |
|--------|-----------------------|---------------------|----------------------------------|---------------|
| `POST` | `/pets`              | Adiciona pet  | `{ "name": "Shoyu", "image_url": url }` | `201 Created` |
| `GET`  | `/pets`              | Lista pets         | -                                  | `200 OK`      |
| `PUT`  | `/pets/{id}` | Atualiza info pet | `{ "name": "Teryaki", "image_url": url }`   | `200 OK`      |
| `DELETE` | `/pets/{id}`        | Remove pet         | -                                 | `204 No Content` |
| `GET`  | `/pets/{id}`          | Mostra pet         | -                                 | `200 OK`      |
| `PATCH`  | `/pets/{id}`        | Atualiza se pet está ativo |    `true`                 | `200 OK`      |
| `GET`  | `/pets/actives`       | Lista todos pets ativos         | -                    | `200 OK`      |
| `POST` | `/vaccinations`       | Adiciona registro de vacina  | `{ "date": "2025-10-01", "nextAdministration": "2026-11-02","completed": false,"vaccineName": "Polivalente","vaccineManufacturer": "Biovac","vaccineBatchNumber": "345AEC","veterinarianName": "Hugo","veterinarianCrmv": "3522", "petId": 6 }` | `201 Created` |
| `GET`  | `/vaccinations`              | Lista vaccinations         | -                                  | `200 OK`      |
| `PUT`  | `/vaccinations/{id}` | Atualiza info vaccinations | `{ "date": "2025-10-01", "nextAdministration": "2026-11-02","completed": false,"vaccineName": "Polivalente","vaccineManufacturer": "Biovac","vaccineBatchNumber": "345AEC","veterinarianName": "Hugo","veterinarianCrmv": "3522", "petId": 6 }`   | `200 OK`      |
| `DELETE` | `/vaccinations/{id}`        | Remove vaccination         | -                                 | `204 No Content` |
| `GET`  | `/vaccinations/{id}`          | Mostra vaccination         | -                                 | `200 OK`      |
| `PATCH`  | `/vaccinations/{id}`        | Atualiza se precisa de reforço |    `true`                 | `200 OK`      |
| `GET`  | `/vaccinations/actives`       | Lista todas vacinações pendentes         | -                    | `200 OK`      |
| `GET`  | `/vaccinations/nextShot/{id}`       | Lista próximas doses de reforço         | -                    | `200 OK`      |


### Exemplos

**POST /pets**  
Request:
```json
{ 
    "name": "Maya",
	"image_url": "urldaimage"
}
```  
`Response (201)`:
```json
{ 
    "id": 1,
	"name": "Maya",
	"imageUrl": "urldaimage",
	"active": true
}
```

**GET /vaccinations/nextShot**  
`Response (200)`:
```json
[
  {
		"id": 4,
		"date": "2025-10-01",
		"nextAdministration": "2026-11-02",
		"completed": false,
		"vaccineName": "Polivalente",
		"vaccineManufacturer": "Biovac",
		"vaccineBatchNumber": "345AEC",
		"veterinarianName": "Hugo",
		"veterinarianCrmv": "3522",
		"petId": 6
	},
	{
		"id": 3,
		"date": "2025-10-01",
		"nextAdministration": "2026-10-02",
		"completed": false,
		"vaccineName": "Polivalente",
		"vaccineManufacturer": "Biovac",
		"vaccineBatchNumber": "345AEC",
		"veterinarianName": "Hugo",
		"veterinarianCrmv": "3522",
		"petId": 6
	}
]
```



### 🚀 Próximos Passos

- Adicionar Frontend com React.js

### 🎓 Principais Aprendizados

- Estratégias para implementação de arquitetura limpa e código limpo.
- Conceitos de Domain Driven Design
- Classes anêmicas VS Classes ricas
 