// EJERCICIO:
//   Implementar rutas para User que hagan:
//     - POST /api/users       -> crear nuevo usuario. Si el email ya existe, devolver error 409.
//     - GET /api/users        -> listar todas
//     - GET /api/users/:id    -> obtener por id.  Si no existe, devolver un error 404.
//     - PATCH /api/users/:id  -> modificar únicamente el campo lastName del usuario.
//     - PUT /api/users/:id   -> No se permite modificar el role, rsto si. Si falla la validación, devolver error 400.
//     - DELETE /api/users/:id -> borrar