import { useDispatch, useSelector } from 'react-redux';
import { andersonApi } from '../api';
import { clearErroMessage, onChecking, onLogin, onLogout } from '../store';

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {

        dispatch(onChecking());

        try {

            const { data } = await andersonApi.post("/auth", { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErroMessage());
            }, 10);
        }
    }

    const startRegiste = async ({ email, password, name }) => {

        dispatch(onChecking());

        try {
            const { data } = await andersonApi.post('/auth/new', { email, password, name });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {

            if (error.response.data.erros !== undefined) {
                if (error.response.data.erros.email !== undefined) {
                    dispatch(onLogout(`${error.response.data.erros.email.msg}`));
                }else{
                    dispatch(onLogout('Ocurrio un error en el registro'));
                }

            }else{
                dispatch(onLogout(`${error.response.data.msg}`));
            }
            setTimeout(() => {
                dispatch(clearErroMessage());
            }, 10);
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {
            const { data } = await andersonApi.post(`/auth/renew?token=${token}`);

            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            console.log(error);
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutDistritos());
        dispatch(onLogout());
    }

    return {
        //* Propiedades
        errorMessage,
        status,
        user,
        //* Metodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegiste,
    }
}
