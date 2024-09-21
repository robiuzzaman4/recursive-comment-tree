import { useState } from "react";
import Button from "./components/button";

type TComment = {
  id: number;
  text: string;
  replies: TComment[];
};

const initialComments: TComment[] = [
  {
    id: 1,
    text: "This is the first comment",
    replies: [
      {
        id: 2,
        text: "This is a reply to the first comment",
        replies: [
          {
            id: 3,
            text: "This is a nested reply",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    text: "This is another top-level comment",
    replies: [],
  },
];

type TCommentItem = {
  comment: TComment;
  onEdit: (id: number, newText: string) => void;
};

const CommentItem = ({ comment, onEdit }: TCommentItem) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");

  // === handling save edit ===
  const handleSaveEdit = () => {
    onEdit(comment.id, editText);
    setIsEditing(false);
  };

  return (
    <div className="p-2 rounded-sm border border-neutral-700 bg-neutral-800 flex flex-col gap-2">
      {isEditing ? (
        <>
          <input
            className="w-full px-4 py-2 rounded-sm bg-neutral-800 border border-neutral-700 focus-visible:outline-none text-sm text-neutral-400"
            value={editText || comment.text}
            onChange={(e) => setEditText(e.target.value)}
          />

          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-neutral-700"
              onClick={handleSaveEdit}
            >
              Save
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="text-neutral-300">{comment.text}</p>

          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
            <Button size="sm">Delete</Button>
            <Button size="sm">Reply</Button>
          </div>
        </>
      )}
    </div>
  );
};

const App = () => {
  const [comments, setComments] = useState<TComment[]>(initialComments);
  const [newCommentText, setNewCommentText] = useState("");

  // === handle add new comment ===
  const handleAddNewComment = () => {
    if (newCommentText.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          text: newCommentText,
          replies: [],
        },
      ]);
      setNewCommentText("");
    }
  };

  // === handle edit comment ===
  const handleEditComment = (id: number, newText: string) => {
    const editComment = (comments: TComment[]) => {
      return comments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, text: newText };
        }
        comment.replies = editComment(comment.replies);
        return comment;
      });
    };

    setComments(editComment(comments));
  };

  return (
    <main className="min-h-screen w-full bg-neutral-900 text-white flex flex-col gap-12">
      <section className="w-full max-w-screen-sm mx-auto px-4 py-12">
        {/* title */}
        <h3 className="text-3xl font-medium tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-cyan-400 to-indigo-200">
          Recursive Comment Tree:
        </h3>

        <div className="w-full flex items-center gap-6 pb-6">
          <input
            className="w-full px-4 py-2 rounded-sm bg-neutral-800 border border-neutral-700 focus-visible:outline-none text-sm text-neutral-400"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />
          <Button
            onClick={handleAddNewComment}
            className="bg-cyan-400 hover:bg-cyan-300 border-cyan-400 hover:border-cyan-300 text-neutral-800"
          >
            Comment
          </Button>
        </div>

        <div className="space-y-2">
          {comments.map((comment, i) => (
            <CommentItem
              key={i}
              comment={comment}
              onEdit={handleEditComment}
              // onDelete={handleDelete}
              // onReply={handleReply}
              // depth={0}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default App;
