import { useState } from "react";
import Button from "./components/button";

type TComment = {
  id: number;
  text: string;
  replies: TComment[];
};

type TCommentItem = {
  comment: TComment;
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
  return (
    <main className="min-h-screen w-full bg-neutral-900 text-white flex flex-col gap-12">
      <section className="w-full max-w-screen-sm mx-auto px-4 py-12">
        {/* title */}
        <h3 className="text-2xl font-normal tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 via-sky-500 to-neutral-300">
          Recursive Comment Tree:
        </h3>

        <div className="w-full flex items-center gap-6 pb-6">
          <input className="w-full px-4 py-2 rounded-sm bg-neutral-800 border border-neutral-700 focus-visible:outline-none text-sm text-neutral-400" />
          <Button>Comment</Button>
        </div>

        <div className="space-y-2">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
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
