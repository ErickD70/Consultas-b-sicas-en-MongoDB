//insertar un nuevo registo en la coleccion
db.Clientes.insertMany([
  {
    _id: 5000,
    nombre: "Mark Trevino",
    productosFavoritos: ["Teclado", "Smartphone", "Audifonos", "Monitor", "Laptop"],
    metodosPago: ["Visa", "PayPal"],
    compras: [
      { producto: "Laptop", fecha: "2026-05-24", monto: 1200 },
      { producto: "Mouse", fecha: "2026-05-20", monto: 25 }
    ]
  }
])
//buscar un cliente
db.Clientes.find(
  { _id: 0 },
  { productosFavoritos: 1, _id: 0 }
)
//añadir un producto a productos favoritos si no existe en el array
db.Clientes.updateOne(
  { _id: 0 },
  { $addToSet: { productosFavoritos: "Smartwatch" } }
)
//comprobar la incercion
db.Clientes.find(
  { _id: 0 },
  { productosFavoritos: 1, _id: 0 }
)
//agrega el producto aun que ya exista repitiendo el dato
db.Clientes.updateOne(
  { _id: 0 },
  { $pull: { productosFavoritos: "Smartwatch" } }
)
//comprobar si se duplico
db.Clientes.find(
  { _id: 0 },
  { productosFavoritos: 1, _id: 0 }
)
//eliminamos el duplicado
db.Clientes.updateOne(
  { _id: 0 },
  [
    { $set: { productosFavoritos: { $setUnion: ["$productosFavoritos", []] } } }
  ]
)
//verificamos si elimino los duplicados
db.Clientes.find(
  { _id: 0 },
  { productosFavoritos: 1, _id: 0 }
)
//se nos muestra el listado de clientes con el producto de Laptop como favorito
db.Clientes.find(
  { productosFavoritos: "Laptop" },
  { productosFavoritos: { $elemMatch: { $eq: "Laptop" } }, nombre: 1, _id: 0 }
)
// con una compra superior a $300
db.Clientes.find(
  { "compras.monto": { $gt: 300 } },
  { nombre: 1, compras: { $elemMatch: { monto: { $gt: 300 } } }, _id: 0 }
)
//buscamos el cliente de id 0
db.Clientes.find(
  { _id: 0 },
  { productosFavoritos: 1, _id: 0 }
)
//bucamos lo clientes del Id 0 al 10
db.Clientes.find(
  { _id: { $gte: 0, $lte: 10 } },
  { productosFavoritos: 1, _id: 0 }
)
//añadimos un productto siempre y cuando este no este ya en sus productos favoritos
db.Clientes.updateMany(
  { _id: { $gte: 0, $lte: 10 } },
  { $addToSet: { productosFavoritos: "Smartwatch" } }
)
//vemos si la operacion se realiso
db.Clientes.find(
  { _id: { $gte: 0, $lte: 10 } },
  { productosFavoritos: 1, _id: 0 }
)
//usamos pull para que se elimine el producto
db.Clientes.updateMany(
  { _id: { $gte: 0, $lte: 10 } },
  { $pull: { productosFavoritos: "Smartwatch" } }
)
//verificamos si se borro
db.Clientes.find(
  { _id: { $gte: 0, $lte: 10 } },
  { productosFavoritos: 1, _id: 0 }
)
//volvemos a añadir solo al cliente ID 0
db.Clientes.updateOne(
  { _id: 0 },   
  { $addToSet: { productosFavoritos: "Smartwatch" } }
)
//agregamos 2 productos sin verificar que esten repetidos
db.Clientes.updateOne(
  { _id: 0 },
  { $push: { productosFavoritos: { $each: ["Smartwatch", "Tablet"] } } }
)
//verificamos que se insertaron
db.Clientes.find(
  { _id: 0 },
  { productosFavoritos: 1, _id: 0 }
)
//nos muestra clientes con datos repetidos en productos favoritos
db.Clientes.aggregate([
  {
    $project: {
      nombre: 1,
      productosFavoritos: 1,
      tieneDuplicados: {
        $ne: [
          { $size: "$productosFavoritos" },
          { $size: { $setUnion: "$productosFavoritos" } }
        ]
      }
    }
  },
  { $match: { tieneDuplicados: true } }
])
//con esta peticion solucionamos los datos repetidos
db.Clientes.updateOne(
  { _id: 0 },
  [
    {
      $set: {
        productosFavoritos: { $setUnion: ["$productosFavoritos", []] }
      }
    }
  ]
)
//verificamos la informacion nuevamente
db.Clientes.find(
  { _id: 0 },
  { productosFavoritos: 1, _id: 0 }
)