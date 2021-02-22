import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SearchNotFound from "./search-not-found";

const Search = () => {
  const router = useRouter();
  const { query } = router.query;

  const [foundItems, setFoundItems] = useState(null);

  useEffect(() => {
    if (query) {
      console.log("searching...");
    }
  }, [query]);

  return foundItems ? (
    <div>
      <h1>Found items</h1>
    </div>
  ) : (
    <SearchNotFound />
  );
};

export default Search;
