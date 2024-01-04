
import { Routes, Route } from 'react-router-dom';
import SalePage from '../../page/analytics/sales';

const DashboardRoutes = () => {
    return (
            <Routes>
                <Route path='/analytics/sales' element={<SalePage />}/>
                <Route path='*' element={<p>Jorge</p>} />
            </Routes>
    );
};

export default DashboardRoutes;
