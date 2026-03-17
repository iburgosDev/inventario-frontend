import { useState, useEffect } from "react"
import "./App.css"

const API = "http://127.0.0.1:8000"

function App() {
  const [productos, setProductos] = useState([])
  const [nombre, setNombre] = useState("")
  const [precio, setPrecio] = useState("")
  const [stock, setStock] = useState("")

  useEffect(() => { obtenerProductos() }, [])

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
    setNombre(""); setPrecio(""); setStock("")
    obtenerProductos()
  }

  async function eliminarProducto(id) {
    await fetch(`${API}/productos/${id}`, { method: "DELETE" })
    obtenerProductos()
  }

  return (
    <div className="app">
      <div className="header">
        <p className="header-label">Sistema de gestión</p>
        <h1>Inventario</h1>
        <p className="header-count"><span>{productos.length}</span> productos registrados</p>
      </div>

      <div className="form-section">
        <p className="form-label">Agregar producto</p>
        <div className="form-row">
          <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
          <input placeholder="Precio" type="number" value={precio} onChange={e => setPrecio(e.target.value)} />
          <input placeholder="Stock" type="number" value={stock} onChange={e => setStock(e.target.value)} />
          <button className="btn-add" onClick={agregarProducto}>+ Agregar</button>
        </div>
      </div>

      <div className="table-section">
        <div className="table-header">
          <span>ID</span>
          <span>Nombre</span>
          <span>Precio</span>
          <span>Stock</span>
          <span></span>
        </div>
        {productos.length === 0
          ? <div className="empty">— sin productos —</div>
          : productos.map(p => (
            <div className="product-row" key={p.id}>
              <span className="product-id">#{p.id}</span>
              <span className="product-name">{p.nombre}</span>
              <span className="product-price">${p.precio}</span>
              <span className="product-stock">{p.stock} u.</span>
              <button className="btn-delete" onClick={() => eliminarProducto(p.id)}>DEL</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App