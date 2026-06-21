import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async ({ confirmPassword, ...data }) => {
    const res = await registerUser(data);
    console.log(res);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-10 text-zinc-950">
      <section className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create account
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            Start building your link profile in a few seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="username" className="text-sm font-medium text-zinc-800">
              username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
              placeholder="Your name"
              {...register("username", {
                required: "username is required",
                minLength: {
                  value: 2,
                  message: "username must be at least 2 characters",
                },
              })}
            />
            {errors.username && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-zinc-800"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-zinc-800"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
              placeholder="Create a password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-zinc-800"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-medium text-zinc-950 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Register;
