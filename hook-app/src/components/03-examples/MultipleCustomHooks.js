import { useFetch } from "../../hooks/useFetch";
import { useCounter } from "../../hooks/useCounter";

export const MultipleCustomHooks = () => {
  const { counter, increment } = useCounter(1);
  const { state, error } = useFetch(
    `https://www.breakingbadapi.com/api/quotes/${counter}`
  );

  const { data, loading } = state;
  return (
    <div>
      <h1>breaking bad quotes</h1>
      <hr />
      {loading && <p>...Loading</p>}
      {data &&
        data.map(({ quote_id, quote, author }) => {
          return (
            <blockquote key={quote_id}>
              <hr />
              <p>{quote}</p>
              <footer>{author}</footer>
              <hr />
            </blockquote>
          );
        })}
      {data && <button onClick={() => increment()}>next quote</button>}
    </div>
  );
};
