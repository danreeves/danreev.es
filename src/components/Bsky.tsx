import { Link } from "./Link.tsx";

interface BskyPost {
  post: {
    uri: string;
    author?: {
      handle: string;
    };
    record: {
      text: string;
      createdAt: string;
      reply?: {
        parent: { uri: string };
        root: { uri: string };
      };
    };
    replyCount?: number;
    repostCount?: number;
    likeCount?: number;
  };
  reason?: {
    $type: string;
    by?: {
      handle: string;
    };
  };
}

interface Post {
  text: string;
  link: string;
  createdAt: Date;
  replyCount: number;
  repostCount: number;
  likeCount: number;
  isReply: boolean;
}

const POST_LIMIT = 7;

async function getLatestBskyPosts(): Promise<Post[]> {
  // Fetch extra items since we filter out reposts of other people's
  // content below - getAuthorFeed includes those alongside real posts.
  const res = await fetch(
    "https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=danreev.es&limit=30",
  );
  const data = await res.json();

  return data.feed
    .filter((item: BskyPost) => {
      const isRepost = item.reason?.$type === "app.bsky.feed.defs#reasonRepost";
      return !isRepost;
    })
    .slice(0, POST_LIMIT)
    .map((item: BskyPost) => {
      // Convert at:// URI to web URL
      // at://did:plc:xxx/app.bsky.feed.post/yyy -> https://bsky.app/profile/danreev.es/post/yyy
      const postId = item.post.uri.split("/").pop();
      return {
        text: item.post.record.text,
        link: `https://bsky.app/profile/danreev.es/post/${postId}`,
        createdAt: new Date(item.post.record.createdAt),
        replyCount: item.post.replyCount || 0,
        repostCount: item.post.repostCount || 0,
        likeCount: item.post.likeCount || 0,
        isReply: !!item.post.record.reply,
      };
    });
}

export async function Bsky() {
  const posts = await getLatestBskyPosts();
  return (
    <div className="flex flex-col gap-2 w-full min-w-0">
      <h2 className="font-title text-3xl sm:text-5xl wrap-break-word " title="Atmosphere">
        Atmosphere
      </h2>
      <ol>
        {posts.map((post: Post) => (
          <li key={post.link} className="flex flex-col gap-1">
            <Link
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap overflow-hidden text-ellipsis block"
            >
              {post.isReply ? "↩️ " : ""}
              {post.text.slice(0, 60)}
              {post.text.length > 60 ? "..." : ""}
            </Link>
            <span className="text-sm opacity-70">
              {post.createdAt.toISOString().split("T")[0]} · 💬 {post.replyCount} ❤️{" "}
              {post.likeCount}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
