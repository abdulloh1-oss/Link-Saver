import { useState } from "react";
import { useLinksStore } from "../Store/useLinksStore";

function LinkList() {
  const [modal, SetModal] = useState(false);
  const [EditModal, SetEditModal] = useState(false);
  const [selectedId, SetSelectedId] = useState();
  let links = useLinksStore((state) => state.links);
  let removeLink = useLinksStore((state) => state.removeLink);
  function remove(id) {
    removeLink(id);
    SetSelectedId(0);
    SetModal(false);
  }
  return (
    <div>
      <div className="flex items-center justify-between mt-5 mb-5">
        <h2 className="text-xl font-bold text-white">Saved Links</h2>

        <div className="badge badge-info badge-lg">
          {links.length} {links.length === 1 ? "link" : "links"}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {links ? (
          links.map((item) => {
            return (
              <div
                key={item.id}
                className="card  bg-gray-100 border border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div
                  key={item.id}
                  className="card bg-gray-800 border border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="card-body p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="card-title text-xl font-bold text-white">
                          {item.title}
                        </h2>

                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link link-info text-sm mt-1 inline-block"
                        >
                          {item.url}
                        </a>
                      </div>

                      {/* Favorite */}
                      {item.favorite === "true" ? (
                        <div className="badge badge-warning gap-1">
                          ⭐ Favorite
                        </div>
                      ) : (
                        []
                      )}
                    </div>

                    {/* Comment */}
                    {item.comment && (
                      <p className="text-gray-300 text-sm leading-relaxed mt-3">
                        {item.comment}
                      </p>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tags.split(",").map((tag, index) => (
                        <span
                          key={index}
                          className="badge bg-blue-500/15 text-blue-300 border border-blue-400/30 px-3 py-3"
                        >
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="card-actions font-Roboto justify-end mt-5 pt-4 border-t border-gray-700">
                      <button className="btn btn-sm btn-ghost text-gray-300 hover:text-white">
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          SetModal(true);
                          SetSelectedId(item.id);
                        }}
                        className="btn btn-sm btn-error btn-outline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>Linklar yo'q</p>
        )}
      </div>
      {modal ? (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-gray-800 border border-gray-700">
            <h3 className="font-bold text-xl text-white">Delete this link?</h3>

            <p className="py-4 text-gray-300">
              Are you sure you want to delete ? This action cannot be undone.
            </p>

            <div className="modal-action">
              <button
                type="button"
                onClick={() => SetModal(false)}
                className="btn btn-ghost text-gray-300"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => remove(selectedId)}
                className="btn btn-error"
              >
                🗑️ Delete
              </button>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button onClick={() => SetModal(false)}>close</button>
          </form>
        </dialog>
      ) : (
        []
      )}

      {EditModal ? (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-gray-800 border border-gray-700 max-w-xl">
            <h3 className="font-bold text-xl text-white mb-5">Edit Link</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title + URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  className="input input-info w-full"
                />

                <input
                  type="url"
                  placeholder="https://example.com"
                  className="input input-info w-full"
                />
              </div>

              {/* Tags */}
              <input
                type="text"
                placeholder="Tag: React, TailwindCSS"
                className="input input-info w-full"
              />

              {/* Comment */}
              <textarea
                placeholder="Comment"
                className="textarea textarea-info resize-none w-full"
              />

              {/* Favorite */}
              <label className="flex items-center gap-3 cursor-pointer w-fit">
                <input type="checkbox" className="checkbox checkbox-warning" />

                <span className="text-gray-300">Add to favorites ⭐</span>
              </label>

              {/* Actions */}
              <div className="modal-action">
                <button type="button" className="btn btn-ghost text-gray-300">
                  Cancel
                </button>

                <button type="submit" className="btn btn-info">
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      ) : (
        []
      )}
    </div>
  );
}

export default LinkList;
