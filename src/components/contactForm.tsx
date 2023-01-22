import { api } from "utils/api";
import { LoadingSpinner } from "./loadingSpinner";
import { contactFormSchema } from "models/contactForm";
import { useZodForm } from "hooks/useZodForm";

const containerStyle =
  "flex flex-col items-center bg-slate-200 py-8 px-3 sm:p-8 rounded";

export const ContactForm = () => {
  const mutation = api.contact.create.useMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useZodForm({
    schema: contactFormSchema,
  });

  if (mutation.isLoading) return <LoadingSpinner />;
  if (mutation.isSuccess)
    return (
      <div className={containerStyle}>
        <h1 className="text-xl">Thanks!</h1>
        <p>We&apos;ll be in touch!</p>
      </div>
    );
  if (mutation.isError)
    return (
      <div className={containerStyle}>
        <p>Oops, something went wrong!</p>
        <button onClick={mutation.reset} className="my-2 bg-green-200 p-2">
          Try again
        </button>
      </div>
    );

  return (
    <form
      className={containerStyle}
      onSubmit={handleSubmit((v) => mutation.mutate(v))}
    >
      <div className="prose mb-4">
        <h1 className="mb-3 pt-3 text-center text-xl">Want Updates?</h1>
        <p className="sm:text-lg">
          Reach out, and we&apos;ll be more than happy to learn about your Ed
          Tech woes and start building out solutions for you!
        </p>
      </div>
      <div className="w-48">
        <label htmlFor="name" className="font-bold">
          Your Name
        </label>
        <p className="text-red-500">
          {errors.name?.message && <span>{errors.name?.message}</span>}
        </p>
        <input
          className="form-input mb-2 rounded-md"
          type="text"
          id="name"
          {...register("name")}
        />
        <label htmlFor="phone">Phone Number</label>
        <p className="text-red-500">
          {errors.phone?.message && <span>{errors.phone?.message}</span>}
        </p>
        <input
          className="form-input mb-2 rounded-md"
          type="text"
          id="phone"
          {...register("phone")}
        />
        <label htmlFor="email">Email</label>
        <p className="text-red-500">
          {errors.email?.message && <span>{errors.email?.message}</span>}
        </p>
        <input
          className="form-input mb-2 rounded-md"
          type="email"
          id="email"
          {...register("email")}
        />
        <div className="flex items-center justify-center text-right">
          <label htmlFor="subscribe">Recieve regular email updates?</label>
          <input
            className="form-checkbox m-4 p-2"
            defaultChecked={true}
            type="checkbox"
            id="subscribe"
            {...register("subscribed")}
          />
        </div>
        <button className="my-2 block rounded bg-slate-800 p-2 text-slate-100 hover:bg-slate-700">
          Submit
        </button>
      </div>
    </form>
  );
};
