'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import matter from 'gray-matter';

export default function EditPostPage(props: { params: Promise<{ category: string; slug: string }> }) {
    const { category: oldCategory, slug: oldSlug } = use(props.params);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<string[]>([]);
    const [preview, setPreview] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Fetch categories and post data
        const fetchData = async () => {
            try {
                setCategories(['ai_tools', 'dev_environment', 'fastapi_backend', 'git_github', 'linux_ubuntu', 'misc', 'projects_cicd']);

                // We'll fetch the raw content from a temporary static route or API if we had one, 
                // but for now, we'll suggest a simple way to get the post data.
                // Since we are in a client component, we might need a GET API for raw content.
                // For now, let's assume we can fetch it or we'll create a quick GET handler.
                const res = await fetch(`/api/posts/raw?category=${oldCategory}&slug=${oldSlug}`);
                const data = await res.json();

                if (data.success) {
                    setTitle(data.title);
                    setCategory(oldCategory);
                    setContent(data.content);
                }
            } catch (err) {
                console.error('Failed to fetch post data', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [oldCategory, oldSlug]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/posts', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    category,
                    content,
                    oldSlug,
                    oldCategory
                }),
            });

            const data = await res.json();

            if (data.success) {
                router.push(`/blog/${data.category}/${data.slug}`);
                router.refresh();
            } else {
                alert(data.error || 'Something went wrong');
            }
        } catch (err) {
            alert('Failed to connect to the server');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <div className="container animate" style={{ padding: '10rem 0' }}><p>Loading post data...</p></div>;

    return (
        <div className="container animate" style={{ paddingBottom: '8rem' }}>
            <section className="post-header" style={{ padding: '6rem 0 3rem' }}>
                <h1>Edit Note</h1>
                <p className="subtitle">Refine your technical insights and keep them up to date.</p>
            </section>

            <div className="new-post-tabs">
                <button
                    onClick={() => setPreview(false)}
                    className={`tab-btn ${!preview ? 'active' : ''}`}
                >
                    Write
                </button>
                <button
                    onClick={() => setPreview(true)}
                    className={`tab-btn ${preview ? 'active' : ''}`}
                >
                    Preview
                </button>
            </div>

            {!preview ? (
                <form onSubmit={handleSubmit} className="new-post-form">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            type="text"
                            placeholder="e.g. How to optimize Docker images"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                                className="form-input"
                            >
                                <option value="">Select a category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat.replace('_', ' ')}</option>
                                ))}
                                <option value="new">+ Create New Category</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Markdown Content</label>
                        <textarea
                            id="content"
                            placeholder="Write your note here using Markdown..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className="form-input textarea"
                            rows={15}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" disabled={isSubmitting} className="btn-primary">
                            {isSubmitting ? 'Updating...' : 'Update Note'}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="preview-container post-content">
                    {content ? (
                        <ReactMarkdown>{content}</ReactMarkdown>
                    ) : (
                        <p className="muted">Nothing to preview yet...</p>
                    )}
                </div>
            )}
        </div>
    );
}
