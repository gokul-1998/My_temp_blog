import { getAllPosts } from '@/lib/markdown';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="container">
      <div className="animate-in" style={{ padding: '6rem 0 2rem' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>Latest Notes</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.25rem', maxWidth: '600px' }}>
          My personal collection of technical guides, snippets, and deep dives.
        </p>
      </div>

      <div className="blog-grid">
        {posts.map((post, index) => (
          <Link
            key={`${post.category}-${post.slug}`}
            href={`/blog/${post.category}/${post.slug}`}
            className="post-card animate-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="post-category">{post.category.replace('_', ' ')}</div>
            <h2 className="post-title">{post.title}</h2>
            <div className="post-date">{format(new Date(post.date), 'MMMM dd, yyyy')}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
