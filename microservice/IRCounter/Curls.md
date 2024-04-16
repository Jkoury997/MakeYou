# API Commands Documentation

Este documento proporciona una lista completa de comandos cURL para interactuar con la API del microservicio de Store. Estos comandos te permitirán realizar solicitudes para crear y gestionar entidades de Store.

## Crear un Nuevo Store

Para crear un nuevo store, envía una solicitud POST con los datos del store en formato JSON:

```bash
curl -X POST http://localhost:3000/ircounter/api/store/create \
-H "Content-Type: application/json" \
-d '{
    "idStore": "12345",
    "name": "My Store",
    "sn": "SN123456"
}'
```

## Listar Store

Para listar todos los store

```bash
curl -X GET http://localhost:3000/ircounter/api/store/list
-H "Content-Type: application/json"
```
## Buscar Store

Para buscar los store por campo 

```bash
curl -X GET "http://localhost:3000/ircounter/api/store/search?idStore=12345&name=My Store&sn=SN123456" 
-H "Content-Type: application/json"
```

## Actualizar un Store

Para actualizar un `Store`, debes enviar una solicitud PUT incluyendo los datos que deseas actualizar. Aquí tienes un ejemplo de cómo hacerlo usando cURL:

```bash
curl -X PUT http://localhost:3000/ircounter/api/store/update/<UUID> \
-H "Content-Type: application/json" \
-d '{
    "name": "Updated Store Name",
    "sn": "UpdatedSN123456"
    "idStore": "S0029"
}'
```

## Eliminar un Store

Se utiliza para borrar de la base de datos un store

```bash
curl -X DELETE http://localhost:3000/ircounter/api/store/delete/<UUID> \
-H "Content-Type: application/json"
```





