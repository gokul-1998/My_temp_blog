import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogList from '@/components/BlogList';
import { Post } from '@/lib/markdown';

const mockPosts: Post[] = [
    {
        title: 'Testing Blog Post',
        category: 'testing',
        date: '2026-01-21',
        slug: 'testing-blog-post',
        fileName: 'testing-blog-post.md',
        content: 'This is a test post content',
    },
    {
        title: 'Another Post',
        category: 'misc',
        date: '2026-01-20',
        slug: 'another-post',
        fileName: 'another-post.md',
        content: 'Some other content',
    },
];

describe('BlogList Component', () => {
    it('renders initial posts', () => {
        render(<BlogList initialPosts={mockPosts} />);
        expect(screen.getByText('Testing Blog Post')).toBeInTheDocument();
        expect(screen.getByText('Another Post')).toBeInTheDocument();
    });

    it('filters posts based on search input', () => {
        render(<BlogList initialPosts={mockPosts} />);
        const searchInput = screen.getByPlaceholderText(/search notes/i);

        fireEvent.change(searchInput, { target: { value: 'testing' } });

        expect(screen.getByText('Testing Blog Post')).toBeInTheDocument();
        expect(screen.queryByText('Another Post')).not.toBeInTheDocument();
    });

    it('shows "No notes found" when no posts match', () => {
        render(<BlogList initialPosts={mockPosts} />);
        const searchInput = screen.getByPlaceholderText(/search notes/i);

        fireEvent.change(searchInput, { target: { value: 'non-existent' } });

        expect(screen.getByText(/no notes found matching your search/i)).toBeInTheDocument();
    });
});
