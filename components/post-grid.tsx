import PostCard, { type PostCardProps } from "./post-card"

export default function PostGrid({
  posts = [],
}: {
  posts?: PostCardProps[]
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <PostCard key={p.id ?? p.slug} {...p} />
      ))}
    </div>
  )
}
