import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import AdminUsers from '../components/ADMIN/AdminUsers/AdminUsers';
import AdminWorkers from '../components/ADMIN/AdminWorkers/AdminWorkers';
import AdminBookings from '../components/ADMIN/AdminBookings/AdminBookings';
import AdminReviews from '../components/ADMIN/AdminReviews/AdminReviews';
import NotAuthorized from '../components/NotAuthorized';
import AdminRoute from '../components/AdminRoute';

const AdminRoutes = () => (
  <Routes> 
    {/* صفحة عدم السماح */}
    <Route path="/not-authorized" element={<NotAuthorized />} />

    {/* جميع صفحات الادمن تحت AdminLayout + الحماية بـ AdminRoute */}
    <Route path="/admin" element={<AdminLayout />}>
      <Route element={<AdminRoute />}>
        {/* 🚫 منع الدخول إلى /admin مباشرة */}
<Route index element={<Dashboard />} />
        
        {/* صفحات الادمن */}
        <Route path="users" element={<AdminUsers />} />
        <Route path="workers" element={<AdminWorkers />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="reviews" element={<AdminReviews />} />
      </Route>
    </Route>
  </Routes>
);

export default AdminRoutes;