import { useEffect, useRef } from 'react';
// import image from '../assets/Coffee_call.svg';

export function HomePage() {
    const items = [
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {/* <img src={image} alt='man walking with coffee' style={{aspectRatio: 1, height: '25rem'}}/> */}
            It took a long time before I realised this about myself...
        </div>,
        <div>
            I like making things.<br/>But finishing things is also incredibly difficult.<br/>So... We should celebrate when we do finish one!
        </div>,
        <div>
            I'm <span className='home-name' style={{color: 'red'}}>Vincent</span>.
            <br />A developer with a passion for front-end.
            <br />I enjoy most forms of creative work, be it <u>art</u>, <u>animation</u> or <u>writing</u>.
        </div>,
        <div>
            I may have started late but let's fill the project page up!
        </div>,
    ];

    const containerRef = useRef<HTMLDivElement | null>(null);
    const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

    useEffect(() => {
        const container = containerRef.current;
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        if (!container || cards.length === 0) return;

        // IntersectionObserver to toggle .in-view on each card when it enters viewport.
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const el = entry.target as HTMLElement;
                    if (entry.isIntersecting) {
                        el.classList.add('in-view');
                    } else {
                        el.classList.remove('in-view');
                    }
                });
            },
            {
                root: container,
                threshold: 0.6, // consider visible when 60% of card is visible
            }
        );

        cards.forEach((c) => io.observe(c));

        return () => io.disconnect();
    }, []);

    return (
        <div className="cards" ref={containerRef}>
            {items.map((content, i) => (
                <div
                    key={i}
                    className="card reveal intro-text"
                    ref={(el) => { cardRefs.current[i] = el; }}
                >
                    {content}
                </div>
            ))}
        </div>
    );
}