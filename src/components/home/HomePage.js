import React from 'react'
import Card from '../card/Card'
import styles from './home.module.css'
import {useSelector, useDispatch} from 'react-redux'
import {removeCharacterAction, addFavoritesAction} from '../../redux/charsDuck'


function Home() {
    let disPatch = useDispatch()
    let chars = useSelector(state => state.characters.characters)

    function nextCharacter(){
        disPatch(removeCharacterAction())
    }

    function addFav() {
        disPatch(addFavoritesAction())
    }

    function renderCharacter() {
        let char = chars[0]
        return (
            <Card 
                rightClick={addFav}
                leftClick={nextCharacter}
                {...char}
            />
        )
    }

    return (
        <div className={styles.container}>
            <h2>Personajes de Rick y Morty</h2>
            <div>
                {renderCharacter()}
            </div>
        </div>
    )
}


export default Home