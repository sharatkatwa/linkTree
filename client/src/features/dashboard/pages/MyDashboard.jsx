import { useEffect, useState } from "react";
import useDashboard from "../hooks/useDashBoard";
import { useForm } from "react-hook-form";


const MyDashboard = () => {
  const {
    addMyLinks,
    removeMyLinks,
    getMyProfile,
    getClicks,
    getClicksPerDay,
  } = useDashboard();

  const [profile, setProfile] = useState({});
  const [myLinks, setMyLinks] = useState([]);
  const [perDayClicks, setPerDayClicks] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const totalClicks = myLinks.reduce(
    (total, link) => total + (link.clickCount || 0),
    0,
  );
  const maxDailyClicks = Math.max(...perDayClicks.map((day) => day.clicks), 1);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // These requests are independent, so load them in parallel on dashboard mount.
      const [profileRes, linksRes, clicksPerDayRes] = await Promise.all([
        getMyProfile(),
        getClicks(),
        getClicksPerDay(),
      ]);

      setProfile(profileRes.data.user);
      setMyLinks(linksRes.data.links);
      setPerDayClicks(clicksPerDayRes.data.data);
    };

    fetchDashboardData();
  }, []);

  const handleRemoveLink = async (linkId) => {
    const res = await removeMyLinks(linkId);
    if (!res) return;

    // Update local state instead of refetching the whole dashboard after delete.
    setMyLinks((prevLinks) => prevLinks.filter((link) => link._id !== linkId));
  };

  const handleAddLink = async (data) => {
    const res = await addMyLinks(data);
    if (!res) return;

    // Append the API response so the new link appears without another GET request.
    setMyLinks((prevLinks) => [res.data.data, ...prevLinks]);
    reset();
  };

  return (
    <main className="min-h-screen pt-20 bg-zinc-50 px-4 py-8 text-zinc-950 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 border-b border-zinc-200 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-500">Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              @{profile.username}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
              Manage your profile links and review recent click activity.
            </p>
          </div>

          <div className="rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600 shadow-sm">
            {profile.email}
          </div>
        </header>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <article className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-zinc-500">Total links</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">
              {myLinks.length}
            </p>
          </article>

          <article className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-zinc-500">Total clicks</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">
              {totalClicks}
            </p>
          </article>

          <article className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-zinc-500">Last 7 days</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">
              {perDayClicks.reduce((total, day) => total + day.clicks, 0)}
            </p>
          </article>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Clicks per day
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Activity from the past 7 days.
                </p>
              </div>
            </div>

            <div className="flex h-64 items-end gap-3 border-b border-zinc-200 pb-3">
              {perDayClicks.map((day) => {
                const height = `${Math.max(
                  (day.clicks / maxDailyClicks) * 100,
                  8,
                )}%`;

                return (
                  <div
                    key={day.date}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div className="text-xs font-medium text-zinc-500">
                      {day.clicks}
                    </div>
                    <div
                      className="w-full rounded-t-md bg-zinc-950 transition"
                      style={{ height }}
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-3 grid grid-cols-7 gap-3 text-center text-xs text-zinc-500">
              {perDayClicks.map((day) => (
                <span key={day.date}>
                  {new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold tracking-tight">Add link</h2>
            <p className="mt-1 text-sm text-zinc-500">create new links.</p>

            <form
              onSubmit={handleSubmit(handleAddLink)}
              className="mt-5 space-y-4"
            >
              <div>
                <label
                  htmlFor="title"
                  className="text-sm font-medium text-zinc-800"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="GitHub"
                  className="mt-2 h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                  {...register("title", {
                    required: "Title is required",
                    minLength: {
                      value: 2,
                      message: "Title must be at least 2 characters",
                    },
                  })}
                />
                {errors.title && (
                  <p className="mt-1.5 text-sm text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="url"
                  className="text-sm font-medium text-zinc-800"
                >
                  URL
                </label>
                <input
                  id="url"
                  type="url"
                  placeholder="https://example.com"
                  className="mt-2 h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                  {...register("url", {
                    required: "URL is required",
                    pattern: {
                      value: /^https?:\/\/.+/i,
                      message: "Enter a valid URL starting with http or https",
                    },
                  })}
                />
                {errors.url && (
                  <p className="mt-1.5 text-sm text-red-600">
                    {errors.url.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Adding..." : "Add link"}
              </button>
            </form>
          </section>
        </div>

        <section className="mt-6 rounded-lg border border-zinc-200 bg-white shadow-sm">
          <div className="border-b border-zinc-200 p-5 sm:p-6">
            <h2 className="text-lg font-semibold tracking-tight">My links</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Review click counts and remove links from your profile.
            </p>
          </div>

          <div className="divide-y divide-zinc-200">
            {myLinks.map((link) => (
              <article
                key={link._id}
                className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6"
              >
                <div className="min-w-0">
                  <h3 className="font-semibold text-zinc-950">{link.title}</h3>
                  <p className="mt-1 truncate text-sm text-zinc-500">
                    {link.url}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700">
                    {link.clickCount} clicks
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(link._id)}
                    className="h-9 rounded-md border border-zinc-300 bg-white px-3 text-sm font-semibold text-zinc-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

export default MyDashboard;
