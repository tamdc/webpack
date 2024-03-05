import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import HackerNews from "./pages/hacker-news";
import Layout from "./components/layout";
import NotFound from "./components/not-found";
import Users from "./pages/users";
import User from "./pages/user";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="news" element={<HackerNews />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:userId" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
