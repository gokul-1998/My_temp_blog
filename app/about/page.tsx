export default function AboutPage() {
    return (
        <div className="container animate">
            <section className="post-header">
                <h1>About This Blog</h1>
                <p className="subtitle">
                    A personal space for technical notes, research, and technical deep dives.
                </p>
            </section>

            <div className="post-content">
                <p>
                    Welcome! This blog is a curated collection of my technical journey. It covers everything from
                    low-level Linux configurations and Git workflows to modern backend architectures with FastAPI
                    and AI developments.
                </p>

                <h2>The Goal</h2>
                <p>
                    The primary purpose of this site is to serve as a high-performance, easily searchable
                    knowledge base. I believe in documenting everything—not just for others, but to solidify
                    my own understanding of complex topics.
                </p>

                <h2>Tech Stack</h2>
                <p>
                    This blog is built with:
                </p>
                <ul>
                    <li><strong>Next.js</strong> - For blazingly fast static generation.</li>
                    <li><strong>TypeScript</strong> - For robust and maintainable code.</li>
                    <li><strong>Vanilla CSS</strong> - Custom premium design system.</li>
                    <li><strong>Markdown</strong> - Powering every single post with automated parsing.</li>
                </ul>
            </div>
        </div>
    );
}
