import { useState, useEffect } from "react";
import { FormField, Loader } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }
  return (
    <p className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</p>
  );
}; 

function Home() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const [searchText, setSearchText] = useState("");

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[$222328] text-[32px]">
          The Community showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Welcome to the community showcase! Here you can find all the latest
          and greatest projects from the community.
        </p>
      </div>

      <div className="mt-16">
        <FormField />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Search results for{" "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards data={[]} title="No results found" />
              ) : (
                <RenderCards data={posts} title="No posts available" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Home;
