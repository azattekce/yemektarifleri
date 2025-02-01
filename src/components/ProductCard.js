import React, { useContext } from 'react'
import './ProductCard.css'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../contexts/ThemeContext'

function ProductCard({ tarif,onDelete }) {
  const { color, mode } = useContext(ThemeContext);
  return (
    <div className="col-3 mb-3">
        <div className={`card border-${mode === "dark" ? "light" : "dark"}`}>
          <img src={`img/${tarif.resim}`} alt={tarif.baslik} />
          <div className="card-body">
              <h5 className="card-title">{tarif.baslik}</h5>
              <p className="aciklama">{tarif.aciklama}</p>
              <Link to={`/tarifler/${tarif.id}`} className={`btn btn-outline-${color}`}>Tarifi İncele</Link>
              <Link to={`/edit/${tarif.id}`} className={`btn btn-outline-primary`}>Düzenle</Link>
              <button className={`btn btn-outline-danger`} onClick={() => onDelete(tarif.id)}>Delete</button>
          </div>
        </div>
    </div>
  )
}


export default ProductCard