import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FeedbackList from './FeedbackList';
import Feedback from './Feedback';
import Login from './Login';
import SignUp from './SignUp';

export default function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeedbackList />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </BrowserRouter>
  );
}
