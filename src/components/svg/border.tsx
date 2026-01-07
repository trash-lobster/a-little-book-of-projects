export function BorderSvg() {
    return (
        <svg width='100%' height='25' className='mx-auto max-w-7xl'>
            <defs>
                <pattern id="p1" viewBox="0 0 260 200" width="10%" height="100%">
                    <rect x='0' y='80' width='80' height='40' fill='#000000'/>
                    <circle cx='130' cy='30' r='30' fill='#ba2b2b'/>
                    <circle cx='130' cy='100' r='30' fill='#ba2b2b'/>
                    <circle cx='130' cy='170' r='30' fill='#ba2b2b'/>
                    <rect transform="translate(180, 80)" width='80' height='40' fill='#000000'/>                    
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#p1)" />
        </svg>
    )
}