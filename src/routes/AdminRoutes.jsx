import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import AdminUsers from '../components/ADMIN/AdminUsers';
import AdminWorkers from '../components/ADMIN/AdminWorkers';
import AdminBookings from '../components/ADMIN/AdminBookings';
import AdminReviews from '../components/ADMIN/AdminReviews';
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