'use client';

export default function Loader() {
    return (
        <>
            <div className="loader-container">
                <div className="bouncing-ball" />
            </div>
            <style jsx>{`
                .loader-container {
                    position: fixed;
                    inset: 0;
                    z-index: 100;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: white;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.5s ease-out;
                }
                
                :global(body.page-loading) .loader-container {
                    opacity: 1;
                    pointer-events: auto;
                }

                .bouncing-ball {
                    width: 20px;
                    height: 20px;
                    background-color: black;
                    border-radius: 50%;
                    animation: bounce 0.6s infinite alternate cubic-bezier(0.5, 0.05, 1, 0.5);
                }

                @keyframes bounce {
                    from { transform: translateY(0); }
                    to { transform: translateY(-40px); }
                }
            `}</style>
        </>
    );
}
