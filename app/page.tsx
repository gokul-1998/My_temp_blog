import { getAllPosts } from '@/lib/markdown';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="container">
      <section className="hero animate">
        <h1>Latest<br />Insights.</h1>
        <p>
          Exploring the intersection of software engineering, system architecture, and modern development tools. A personal feed of technical discoveries and deep dives.
        </p>
      </section>

      <div className="blog-grid">
        {posts.map((post, index) => (
          <Link
            key={`${post.category}-${post.slug}`}
            href={`/blog/${post.category}/${post.slug}`}
            className="post-card animate"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <span className="post-category-tag">{post.category.replace('_', ' ')}</span>
            <h2 className="post-title">{post.title}</h2>
            <div className="post-date">{format(new Date(post.date), 'MMM dd, yyyy')}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
