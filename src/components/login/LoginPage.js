import React from 'react'
import styles from './login.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { doGoogleLoginAction, logoutAction } from '../../redux/userDuck';

function LoginPage() {
    let dispacth = useDispatch()
    let fetching = useSelector(state => state.user.fetching);
    let loggedIn = useSelector(state => state.user.loggedIn);

    const doLogin = () => {
        dispacth(doGoogleLoginAction())
    }

    const logout = () => {
        dispacth(logoutAction())
    }

    return (
        <div className={styles.container}>
            {
                fetching?
                <h2>Cargando...</h2>
                :
                <>
                    {
                        loggedIn?
                            <h1>
                                Cierra tu sesión
                            </h1>
                        :
                            <h1>
                                Inicia Sesión con Google
                            </h1>
                    }
                    {
                        loggedIn?
                            <button onClick={logout}>
                                Cerrar Sesión
                            </button>
                        :
                            <button onClick={doLogin}>
                                Iniciar
                            </button>
                    }
                </>
            }
        </div>
    )
}

export default LoginPage