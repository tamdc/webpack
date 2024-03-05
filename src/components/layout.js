import React from "react";
import { Link, Outlet } from "react-router-dom";

const Laypout = () => {
  return (
    <>
      <nav style={{ display: "flex", gap: 16 }}>
        <Link to="/">Home</Link>
        <Link to="/news">news</Link>
        <Link to="/users">users</Link>
        {/* <Link to="/coin">coin</Link> */}
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Laypout;
