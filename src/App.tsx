import { useState } from "react";
import Button from "./components/button";
import { cn } from "./utils/cn";

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
  onDelete: (id: number) => void;
  onReply: (parentId: number, replyText: string) => void;
  depth: number;
};

const CommentItem = ({
  comment,
  onEdit,
  onDelete,
  onReply,
  depth,
}: TCommentItem) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  // === handling save edit ===
  const handleSaveEdit = () => {
    onEdit(comment.id, editText);
    setIsEditing(false);
    setEditText("");
  };

  // === handling delete ===
  const handleDelete = () => {
    onDelete(comment.id);
  };

  // === handling reply ===
  const handleReply = () => {
    onReply(comment.id, replyText);
    setIsReplying(false);
    setReplyText("");
  };

  return (
    <div
      className={cn("", {
        "border-l border-l-neutral-700": depth > 0,
      })}
    >
      <div className="p-2 rounded-sm bg-neutral-800 flex flex-col gap-2">
        {isEditing ? (
          <>
            <input
              className="w-full px-4 py-2 rounded-sm bg-neutral-800 border border-neutral-700 focus-visible:outline-none text-sm text-neutral-400"
              value={editText || comment.text}
              onChange={(e) => setEditText(e.target.value)}
            />

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => {
                  setIsEditing(false);
                  setEditText("");
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-neutral-700 disabled:cursor-not-allowed"
                onClick={handleSaveEdit}
                disabled={editText === ""}
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
              <Button size="sm" onClick={handleDelete}>
                Delete
              </Button>
              <Button size="sm" onClick={() => setIsReplying(true)}>
                Reply
              </Button>
            </div>
          </>
        )}

        {isReplying && (
          <>
            <input
              className="w-full px-4 py-2 rounded-sm bg-neutral-800 border border-neutral-700 focus-visible:outline-none text-sm text-neutral-400"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => {
                  setIsReplying(false);
                  setReplyText("");
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-neutral-700 disabled:cursor-not-allowed"
                onClick={handleReply}
                disabled={replyText === ""}
              >
                Send Reply
              </Button>
            </div>
          </>
        )}

        {comment.replies.length > 0 && (
          <div className="ml-2">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                onDelete={onDelete}
                onEdit={onEdit}
                onReply={onReply}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
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

  // === handle delete comment ===
  const handleDeleteComment = (id: number) => {
    const deleteComment = (comments: TComment[]) => {
      return comments.filter((comment) => {
        if (comment.id === id) {
          return false;
        }
        comment.replies = deleteComment(comment.replies);
        return true;
      });
    };

    setComments(deleteComment(comments));
  };

  // === handle reply comment ===
  const handleReplyCommenet = (parantId: number, replyText: string) => {
    const replyComment = (comments: TComment[]) => {
      return comments.map((comment) => {
        if (comment.id === parantId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              { id: Date.now(), text: replyText, replies: [] },
            ],
          };
        }
        comment.replies = replyComment(comment.replies);
        return comment;
      });
    };

    setComments(replyComment(comments));
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
              onDelete={handleDeleteComment}
              onReply={handleReplyCommenet}
              depth={0}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default App;
