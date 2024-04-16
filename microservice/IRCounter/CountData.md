# CountData API Documentation

Este documento describe cómo interactuar con la API para gestionar los registros de `CountData`. Incluye ejemplos de cómo crear, recuperar, actualizar y eliminar registros, así como cómo realizar búsquedas avanzadas con múltiples parámetros.

## Crear un Nuevo CountData

Para crear un nuevo registro de `CountData`:

```bash
curl -X POST http://localhost:3000/api/countdata \
-H "Content-Type: application/json" \
-d '{
    "sn": "12345XYZ",
    "timeStamp": "2023-04-12T14:48:00.000Z",
    "inCount": 50,
    "outCount": 30,
    "receivingPower": 75,
    "transmissionPower": 85,
    "codeStatus": "active",
    "version": "v1.2",
    "model": "ModelX",
    "idStore": "store123"
}'
```

## Obtener Todos los CountData

Para listar todos los registros de CountData disponibles:

```bash
curl -X GET http://localhost:3000/api/countdata \
-H "Content-Type: application/json"
```

## Buscar un CountData por ID

Para obtener un registro específico de CountData por su ID:

```bash
curl -X GET http://localhost:3000/api/countdata/{id} \
-H "Content-Type: application/json"
```

## Actualizar un CountData

Para actualizar un registro existente de CountData:

```bash
curl -X PUT http://localhost:3000/api/countdata/{id} \
-H "Content-Type: application/json" \
-d '{
    "inCount": 100,
    "outCount": 120
}'

```
## Eliminar un CountData

Para eliminar un registro de CountData:

```bash
curl -X DELETE http://localhost:3000/api/countdata/{id} \
-H "Content-Type: application/json"

```
## Búsqueda Avanzada

Para realizar búsquedas avanzadas con filtros múltiples:

```bash
curl -X GET "http://localhost:3000/api/search/advanced/countdata?startDate=2023-01-01&endDate=2023-01-02&idStores=store1,store2&dayOfWeek=1,2" \
-H "Content-Type: application/json"

```
