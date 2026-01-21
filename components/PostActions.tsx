'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PostActionsProps {
    slug: string;
    category: string;
}

export default function PostActions({ slug, category }: PostActionsProps) {
    const router = useRouter();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
            try {
                const res = await fetch('/api/posts', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ slug, category }),
                });

                const data = await res.json();

                if (data.success) {
                    router.push('/');
                    router.refresh();
                } else {
                    alert(data.error || 'Failed to delete post');
                }
            } catch (err) {
                alert('Failed to connect to the server');
            }
        }
    };

    return (
        <div className="post-actions">
            <Link href={`/blog/${category}/${slug}/edit`} className="action-btn edit">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                Edit Note
            </Link>
            <button onClick={handleDelete} className="action-btn delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                Delete
            </button>
        </div>
    );
}
