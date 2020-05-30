import React from 'react'
import styles from './favs.module.css'
import Card from '../card/Card'
import { useSelector, /* useDispatch */ } from 'react-redux'

export default function FavPage() {
    let characters = useSelector(state => state.characters.favorites)
    console.log(characters)
    /* let dispatch = useDispatch(); */
    function renderCharacter(char, i) {
        return (
            <Card hide {...char} key={i} />
        )
    }
    return (
        <div className={styles.container}>
            <h2>Favoritos</h2>
            {characters.map(renderCharacter)}
            {!characters.length && <h3>No hay personajes agregados</h3>}
        </div>
    )
}