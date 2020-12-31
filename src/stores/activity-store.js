import { readable, writable } from 'svelte/store';

const DISPLAYSETTINGS = {
    width: 700,
    height: 500,
    marginParams: {
        margins: 10,
        bottomMargin: 250, // specific margin settings also available
        // leftMargin: 200 // wdMargins and htMargins (left/right and top/bottom, respectively)

    },
    backgroundImg: "https://picsum.photos/700/500"
}

const INITIALDOTSETTINGS = {
    dotColors: ["orange", "burlywood", "cornflowerblue", "mediumseagreen"],
    dotRadius: 9,
    dotsPerColor: 4
}

const CURRENTINITIALSETTINGS = {
    dotColors: [],
    dotRadius: 0,
    dotsPerColor: 0
}

export const displaySettings = readable(DISPLAYSETTINGS);
export const initialDotSettings = readable(INITIALDOTSETTINGS);
export const currentDotSettings = writable(CURRENTINITIALSETTINGS);