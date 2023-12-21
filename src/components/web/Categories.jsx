import Container from "../shared/Container";
import { useQuery } from "react-query";
import Loader from "../shared/Loader";

function Categories() {
  const { data, isLoading } = useQuery("web_categories");

  if (isLoading) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <Container>
      <h1 className="pb-5 pt-20 text-4xl font-bold">Categories</h1>
      <hr className="mb-10" />
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 md:gap-10 gap-5 mb-10">
        {data?.categories.length ? (
          data?.categories.map((category) => (
            <div className="category dark:bg-gray-900 bg-gray-200 border dark:border-gray-700 border-gray-400 bg- p-10 rounded-xl" key={category._id}>
              <img
                src={category.image.secure_url}
                alt="category"
                className="w-full rounded-lg"
              />
              <h2 className="text-center text-lg font-bold">{category.name}</h2>
            </div>
          ))
        ) : (
          <div className="flex h-screen items-center justify-center">
            <img src="/images/confused-emoji.svg" alt="broken link" />
            <h2 className="pl-5 text-5xl">Unable to load categories</h2>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Categories;
