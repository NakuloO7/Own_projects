import { Appbar } from "@/Components/Appbar";
import { BlogSkeleton } from "@/Components/BlogSkeleton";
import { Fullblog } from "@/Components/Fullblog";
import { useBlog } from "@/hooks";
import { useParams } from "react-router-dom";

export const Blog = () => {
  const { id } = useParams();
  if(!id) {
    return (
        <div>Invalid blog ID</div>
    )
  }
  const {loading, blog} = useBlog({id});

  if(loading || !blog){
    return <div>
      <Appbar />
      <div className="flex mt-10 justify-center">
        <BlogSkeleton />
      </div>
    </div>;
  }

  return (
    <div className="mt-6">
        <Fullblog blog = {blog} />
    </div>
  );
};
