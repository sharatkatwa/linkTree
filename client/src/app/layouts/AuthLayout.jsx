import { Link, Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <>
      <Link
        to="/"
        className="fixed left-4 top-4 z-10 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-zinc-950 hover:text-zinc-950"
      >
        Back to home
      </Link>
      <Outlet />
    </>
  );
};

export default AuthLayout;
