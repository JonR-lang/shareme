import { useState, useEffect } from "react";
import MasonryLayout from "./MasonryLayout";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import Spinner from "./Spinner";

const Search = ({ search }) => {
  const [pins, setPins] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (search) {
      setIsLoading(true);
      const query = searchQuery(search.toLowerCase());
      client.fetch(query).then((data) => {
        setPins(data);
        setIsLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setIsLoading(false);
      });
    }
  }, [search]);

  return (
    <div>
      {isLoading && <Spinner message='Searching for Pins' />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && search !== "" && !isLoading && (
        <div className='mt-10 text-center text-xl'>No pins found</div>
      )}
    </div>
  );
};

export default Search;
