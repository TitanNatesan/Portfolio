import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="text-center max-w-2xl">
                <h1 className="text-[8rem] font-bold leading-none mb-4 bg-gradient-to-r from-black to-neutral-600 bg-clip-text text-transparent">
                    404
                </h1>
                <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
                <p className="text-lg text-neutral-600 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-block cta-button starry-btn px-8 py-3 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors"
                >
                    <span>Go Back Home</span>
                </Link>
            </div>
        </div>
    );
}

export const metadata = {
    title: '404 - Page Not Found',
    description: 'The page you are looking for could not be found.',
};
