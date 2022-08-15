import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { CheckingAuth } from '../anderson/components';
import { AndersonRoutes } from '../anderson/routes';
import { AuthRoutes } from '../auth/routes';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    if (status === 'checking') {
        return (
            <CheckingAuth />
        )
    }

    return (
        <Routes>
            {
                (status === 'not-authenticated')
                    ? (
                        <>
                            <Route path='/auth/*' element={<AuthRoutes />} />
                            <Route path='/*' element={<Navigate to='/auth/login' />} />
                        </>
                    )
                    : (
                        <>
                            <Route path='/*' element={<AndersonRoutes />} />
                            <Route path='/*' element={<Navigate to='/' />} />
                        </>
                    )
            }

        </Routes>
    )
}
