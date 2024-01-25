export function getRandomColor(): string {
    const letters: string = '0123456789ABCDEF';
    let color: string = '#';


    for (let i:number = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

