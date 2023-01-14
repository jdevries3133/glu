import trpc from "@trpc/next";

import { api } from "../utils/api";

const Test = () => {
  const utils = api.useContext();
  const query = api.example.getAll.useQuery();
  const mutation = api.example.makeOne.useMutation({
    onSettled() {
      return utils.example.getAll.invalidate();
    },
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Test Page</h1>
      <button>Click me to add a row to the database</button>
      <button onClick={() => mutation.mutate()} className="form-input">
        click me
      </button>
      <div>
        {query.data &&
          query.data.map((i) => (
            <p key={i.id}>
              {i.id}; {i.createdAt.toString()}; {i.updatedAt.toString()}
            </p>
          ))}
      </div>
    </div>
  );
};

export default Test;
