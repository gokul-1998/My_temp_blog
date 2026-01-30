'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export default function NewPostPage() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categories, setCategories] = useState<string[]>([]);
    const [preview, setPreview] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setCategories(['ai_tools', 'dev_environment', 'fastapi_backend', 'git_github', 'linux_ubuntu', 'misc', 'projects_cicd']);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, category, content }),
            });

            const data = await res.json();

            if (data.success) {
                router.push(`/blog/${data.category}/${data.slug}`);
            } else {
                alert(data.error || 'Something went wrong');
            }
        } catch (err) {
            alert('Failed to connect to the server');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container animate" style={{ paddingBottom: '8rem' }}>
            <section className="post-header" style={{ padding: '6rem 0 3rem' }}>
                <h1>Create New Note</h1>
                <p className="subtitle">Draft your technical insights directly to the knowledge base.</p>
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

                        {category === 'new' && (
                            <div className="form-group">
                                <label htmlFor="new-category">New Category Name</label>
                                <input
                                    id="new-category"
                                    type="text"
                                    placeholder="e.g. databases"
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                    className="form-input"
                                />
                            </div>
                        )}
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
                            {isSubmitting ? 'Publishing...' : 'Publish Note'}
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
