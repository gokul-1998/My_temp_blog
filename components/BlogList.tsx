'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Post } from '@/lib/markdown';

export default function BlogList({ initialPosts }: { initialPosts: Post[] }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPosts = initialPosts.filter((post) => {
        const searchContent = `${post.title} ${post.category} ${post.slug}`.toLowerCase();
        return searchContent.includes(searchQuery.toLowerCase());
    });

    return (
        <div className="animate">
            <div className="search-container">
                <div className="search-wrapper">
                    <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <input
                        type="text"
                        placeholder="Search notes, categories, or keywords..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            <div className="blog-grid">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => (
                        <Link
                            key={`${post.category}-${post.slug}`}
                            href={`/blog/${post.category}/${post.slug}`}
                            className="post-card"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <span className="post-category-tag">{post.category.replace('_', ' ')}</span>
                            <h2 className="post-title">{post.title}</h2>
                            <div className="post-date">{format(new Date(post.date), 'MMM dd, yyyy')}</div>
                        </Link>
                    ))
                ) : (
                    <div className="no-results">
                        <p>No notes found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
