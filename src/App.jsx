import { useState, useEffect } from "react"

const API = "http://127.0.0.1:8000"

function App() {
  const [productos, setProductos] = useState([])
  const [nombre, setNombre] = useState("")
  const [precio, setPrecio] = useState("")
  const [stock, setStock] = useState("")

  // Cargar productos al iniciar
  useEffect(() => {
    obtenerProductos()
  }, [])

  async function obtenerProductos() {
    const res = await fetch(`${API}/productos`)
    const data = await res.json()
    setProductos(data)
  }

  async function agregarProducto() {
    if (!nombre || !precio || !stock) return
    await fetch(`${API}/productos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        precio: parseFloat(precio),
        stock: parseInt(stock)
      })
    })
    setNombre("")
    setPrecio("")
    setStock("")
    obtenerProductos()
  }

  async function eliminarProducto(id) {
    await fetch(`${API}/productos/${id}`, { method: "DELETE" })
    obtenerProductos()
  }

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>📦 Inventario</h1>

      {/* Formulario */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
        <input
          placeholder="Precio"
          type="number"
          value={precio}
          onChange={e => setPrecio(e.target.value)}
        />
        <input
          placeholder="Stock"
          type="number"
          value={stock}
          onChange={e => setStock(e.target.value)}
        />
        <button onClick={agregarProducto}>Agregar</button>
      </div>

      {/* Lista de productos */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ccc", textAlign: "left" }}>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>${p.precio}</td>
              <td>{p.stock}</td>
              <td>
                <button
                  onClick={() => eliminarProducto(p.id)}
                  style={{ color: "red", cursor: "pointer" }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App