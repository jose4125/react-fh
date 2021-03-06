import { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Calendar } from '../components/calendar/Calendar';
import { LoginRegister } from '../components/auth/LoginRegister';

export const AppRouter = (): ReactElement => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="login" element={<LoginRegister />} />
        <Route path="*" element={<Calendar />} />
      </Routes>
    </Router>
  );
};
