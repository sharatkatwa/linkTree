import { Link, Outlet, useNavigation } from "react-router";

const AuthLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  return (
    <>
      {isPageLoading && (
        <div className="fixed left-0 top-0 z-50 h-1 w-full overflow-hidden bg-zinc-200">
          <div className="h-full w-1/2 animate-pulse bg-zinc-950" />
        </div>
      )}

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
