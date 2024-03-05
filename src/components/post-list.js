import React, { useState } from "react";
import { HN_HOST } from "../constants/index";
import useDataFetch from "../hooks/useDataFetch";

const PostList = () => {
  const [query, setQuery] = useState("redux");
  const [{ isLoading, isError, data }, fetchData] = useDataFetch(
    `${HN_HOST}/search?query=${query}`,
    { hits: [] }
  );

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchData(`${HN_HOST}/search?query=${query}`);
        }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
        />
        <button type="submit">Search</button>
      </form>
      {isError && <div>Something went wrong</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits.map((hit) => (
            <li key={hit.objectID}>
              <a href={hit.url}>{hit.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;
