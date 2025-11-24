use('Usuarios')
 
db.users.insertMany(
 [
  {
    name: "Laura",
    lastName: "Martínez",
    email: "laura.martinez@example.com",
    password: "123456",
    role: "user",
  },
  {
    name: "Carlos",
    lastName: "García",
    email: "carlos.garcia@example.com",
    password: "123456",
    role: "user",
  },
  {
    name: "Ana",
    lastName: "López",
    email: "ana.lopez@example.com",
    password: "123456",
    role: "user",
  },
  {
    name: "Miguel",
    lastName: "Serrano",
    email: "miguel.serrano@example.com",
    password: "123456",
    role: "admin",
  },
  {
    name: "Elena",
    lastName: "Pérez",
    email: "elena.perez@example.com",
    password: "123456",
    role: "user",
  },
  {
    name: "Javier",
    lastName: "Ruiz",
    email: "javier.ruiz@example.com",
    password: "123456",
    role: "user",
  },
  {
    name: "Marta",
    lastName: "Hernández",
    email: "marta.hernandez@example.com",
    password: "123456",
    role: "user",
  },
  {
    name: "David",
    lastName: "Navarro",
    email: "david.navarro@example.com",
    password: "123456",
    role: "user",
  },
  {
    name: "Lucía",
    lastName: "Ortega",
    email: "lucia.ortega@example.com",
    password: "123456",
    role: "user",
  },
  {
    name: "Pablo",
    lastName: "Fernández",
    email: "pablo.fernandez@example.com",
    password: "123456",
    role: "user",
  },
]);