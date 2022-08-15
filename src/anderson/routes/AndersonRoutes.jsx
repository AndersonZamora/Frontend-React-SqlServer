import { Navigate, Route, Routes } from 'react-router-dom';
import { AndersonPage } from '../pages';

export const AndersonRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AndersonPage />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    )
}
