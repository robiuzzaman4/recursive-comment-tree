import { useState } from "react";
import Button from "./components/button";

type TComment = {
  id: string | Date;
  text: string;
  replies: TComment[];
};

type TCommentItem = {
  comment: TComment;
};

const initialComments: TComment[] = [
  {
    id: "1",
    text: "This is the first comment",
    replies: [
      {
        id: "2",
        text: "This is a reply to the first comment",
        replies: [
          {
            id: "3",
            text: "This is a nested reply",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: "4",
    text: "This is another top-level comment",
    replies: [],
  },
];

const CommentItem = ({ comment }: TCommentItem) => {
  return (
    <div className="p-2 rounded-sm border border-neutral-700 bg-neutral-800 flex flex-col gap-2">
      <p className="text-neutral-300">{comment.text}</p>

      <div className="flex items-center gap-2">
        <Button size="sm">Edit</Button>
        <Button size="sm">Delete</Button>
        <Button size="sm">Reply</Button>
      </div>
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
          id: new Date(),
          text: newCommentText,
          replies: [],
        },
      ]);
      setNewCommentText("");
    }
  };

  return (
    <main className="min-h-screen w-full bg-neutral-900 text-white flex flex-col gap-12">
      <section className="w-full max-w-screen-sm mx-auto px-4 py-12">
        {/* title */}
        <h3 className="text-3xl font-medium tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200">
          Recursive Comment Tree:
        </h3>

        <div className="w-full flex items-center gap-6 pb-6">
          <input
            className="w-full px-4 py-2 rounded-sm bg-neutral-800 border border-neutral-700 focus-visible:outline-none text-sm text-neutral-400"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />
          <Button onClick={handleAddNewComment}>Comment</Button>
        </div>

        <div className="space-y-2">
          {comments.map((comment, i) => (
            <CommentItem
              key={i}
              comment={comment}
              // onDelete={handleDelete}
              // onEdit={handleEdit}
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
