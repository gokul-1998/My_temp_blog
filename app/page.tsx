import { getAllPosts } from '@/lib/markdown';
import BlogList from '@/components/BlogList';

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

      <BlogList initialPosts={posts} />
    </div>
  );
}
