import { Link } from "react-router";
import useHome from "../hooks/useHome";
import { useEffect, useState } from "react";



const Home = () => {
  const { getAllUserProfiles } = useHome();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    getAllUserProfiles()
      .then((data) => setProfiles(data.data))
      .catch((error) => console.log(error));
      
    return () => {
      console.log("home component unmounted");
    };
  }, []);

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8 text-zinc-950 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <header className="mb-8 border-b border-zinc-200 pb-6">
          <div>
            <p className="text-sm font-medium text-zinc-500">Directory</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Discover profiles
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
              Browse creators, founders, and professionals sharing their best
              links in one place.
            </p>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {profiles.map((user) => (
            <article
              key={user.id}
              className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white">
                  {user.username.slice(0, 2).toUpperCase()}
                </div>
                {/* <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
                  {user.links} links
                </span> */}
              </div>

              <div className="mt-5">
                <h2 className="text-base font-semibold text-zinc-950">
                  @{user.username}
                </h2>
                <p className="mt-2 min-h-12 text-sm leading-6 text-zinc-600">
                  {user.email}
                </p>
                {/* <p className="mt-2 min-h-12 text-sm leading-6 text-zinc-600">
                  {user.bio}
                </p> */}
              </div>

              <Link
                to={`/${user.username}`}
                className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-md border border-zinc-300 bg-white text-sm font-semibold text-zinc-950 transition hover:border-zinc-950 hover:bg-zinc-950 hover:text-white"
              >
                View profile
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
