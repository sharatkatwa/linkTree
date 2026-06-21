import { useParams } from "react-router";
import useHome from "../hooks/useHome";
import { useEffect, useState } from "react";

const Profile = () => {
  const { getUserLinks, addUserClicks } = useHome();
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [userLinks, setUserLinks] = useState([]);

  useEffect(() => {
    // Load the public profile using the username from the route.
    getUserLinks(username).then((data) => {
      setUser(data.user);
      setUserLinks(data.links);
    });
  }, [username]);

  const handleClickLink = (linkId, url) => {
    // Track the click before opening the real destination in a new tab.
    addUserClicks(linkId)
      .then(() => {
        window.open(url, "_blank", "noopener,noreferrer");
      })
      .catch((error) => console.log(error));
  };
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-12 text-zinc-950 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-2xl">
        <header className="mb-8 rounded-lg border border-zinc-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-zinc-950 text-xl font-semibold uppercase text-white">
            {username.slice(0, 2).toUpperCase()}
          </div>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight">
            @{user.username}
          </h1>
          <h1 className="mt-5 text-xl  tracking-tight">
            {user.bio || "Empty Bio..."}
          </h1>
          <div className="mt-4 inline-flex rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-600">
            {userLinks.length} links
          </div>
        </header>

        <div className="space-y-3">
          {userLinks.length ? (
            userLinks.map((link) => (
              <button
                key={link._id}
                onClick={() => handleClickLink(link._id, link.url)}
                target="_blank"
                rel="noreferrer"
                className="group block w-[100%] rounded-lg border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-base font-semibold text-zinc-950">
                      {link.title}
                    </h2>
                  </div>
                  <span className="mt-1 shrink-0 text-sm font-medium text-zinc-400 transition group-hover:text-zinc-950">
                    Open
                  </span>
                </div>
              </button>
            ))
          ) : (
            <h2 className="text-base font-semibold text-zinc-950 text-center">
              No Links
            </h2>
          )}
        </div>
      </section>
    </main>
  );
};

export default Profile;
