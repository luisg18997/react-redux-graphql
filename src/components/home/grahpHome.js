import React, {useEffect, useState} from 'react'
import Card from '../card/Card'
import styles from './home.module.css'
import {gql} from 'apollo-boost'
import {useQuery} from 'react-apollo'

let GraphHome = () => {
    const [characters, setChars] = useState([])
    let query = gql`
        {
            characters {
                results{
                image
                name
                }
            }
        }
    `;

    let {data,loading, error} = useQuery(query)

    useEffect(() => {
        if(data && !loading && !error) {
            setChars([...data.characters.results])
        }
    },[data, loading, error])

    function nextCharacter(){
        characters.shift()
        setChars([...characters])
    }

    function renderCharacter() {
        let char = characters[0]
        return (
            <Card 
               // rightClick={addFav}
                leftClick={nextCharacter}
                {...char} 
            />
        )
    }

    return (
        <div className={styles.container}>
            <h2>Personajes de Rick y Morty</h2>
            {
                !loading &&
                <div>
                    {renderCharacter()}
                </div>
            }
        </div>
    )
}

export default GraphHome