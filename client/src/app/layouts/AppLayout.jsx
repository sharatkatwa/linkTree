import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import useAuth from "../../features/auth/hooks/useAuth";

const AppLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { getMeUser, logoutUser } = useAuth();
  const [user, setUser] = useState(null);
  const showBackButton = pathname !== "/";

  useEffect(() => {
    const checkUser = async () => {
      const res = await getMeUser();
      setUser(res?.data?.user || null);
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    const res = await logoutUser();
    if (!res) return;

    setUser(null);
    navigate("/");
  };

  return (
    <>
      <div className="fixed right-4 top-4 z-10 flex items-center gap-2">
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-zinc-950 hover:text-zinc-950"
            >
              Dashboard
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md bg-zinc-950 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/auth/login"
            className="rounded-md bg-zinc-950 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800"
          >
            Login
          </Link>
        )}
      </div>

      {showBackButton && (
        <Link
          to="/"
          className="fixed left-4 top-4 z-10 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-zinc-950 hover:text-zinc-950"
        >
          Back to home
        </Link>
      )}
      <Outlet />
    </>
  );
};

export default AppLayout;
