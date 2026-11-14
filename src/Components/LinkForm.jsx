import { useRef } from "react";
import { useLinksStore } from "../Store/useLinksStore";
function LinkForm() {
  // Store functions
  let addLink = useLinksStore((state) => state.addLink);


  const title = useRef();
  const url = useRef();
  const tags = useRef();
  const comment = useRef();
  const favorite = useRef();
  const id = crypto.randomUUID();

  
  function form(evt) {
    evt.preventDefault();

    const Data = new FormData();

    Data.append("title", title.current.value);
    Data.append("url", url.current.value);
    Data.append("tags", tags.current.value);
    Data.append("comment", comment.current.value);
    Data.append("favorite", favorite.current.checked);
    Data.append("id", id);
    addLink(Object.fromEntries(Data));
    console.log(Object.fromEntries(Data));
  }

  return (
    <div>
      <form onSubmit={form} className="space-y-4">
        {/* Title va URL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            ref={title}
            placeholder="Title"
            name="title"
            className="input input-info w-full"
          />

          <input
            type="url"
            name="url"
            ref={url}
            placeholder="https://example.com"
            className="input input-info w-full"
          />
        </div>

        {/* Tags va Comment */}
        <div className="space-y-4">
          <input
            type="text"
            name="tags"
            ref={tags}
            placeholder="Tag: React, TailwindCSS"
            className="input input-info w-full"
          />

          <textarea
            className="textarea textarea-info resize-none w-full"
            placeholder="Comment"
            name="comment"
            ref={comment}
          />

          {/* Favorite */}
          <label className="flex items-center gap-3 cursor-pointer w-fit group">
            <input
              type="checkbox"
              ref={favorite}
              className="
                checkbox checkbox-info
                transition-all duration-200
                group-hover:scale-110
              "
            />

            <span className="text-sm font-medium text-gray-600 group-hover:text-info transition-colors">
              Add to favorites
            </span>
          </label>
        </div>

        {/* Action */}
        <div className="flex justify-end pt-2">
          <button type="submit" className="btn btn-accent">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default LinkForm;
