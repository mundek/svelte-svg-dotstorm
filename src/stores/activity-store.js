import { readable, writable } from 'svelte/store';

const DISPLAYSETTINGS = {
    width: 800,
    height: 600,
    marginParams: {
        margins: 10,
        topMargin: 200, // specific margin settings also available
        // leftMargin: 200 // wdMargins and htMargins (left/right and top/bottom, respectively)

    },
}

const CURRENTMAPSETTINGS = {
    backgroundImg: "/images/MAP-yellow.forest.jpg"
}

// use random image of appropriate size if no background image is provided
// TODO: Implement flat text file (format TBD) to add selection of environments (map images) and selection processes (shrinking habitable territory, loss of cover, increased mortality from pollution, etc.)
if (!CURRENTMAPSETTINGS.backgroundImg) {
    CURRENTMAPSETTINGS.backgroundImg = `https://picsum.photos/${DISPLAYSETTINGS.width}/${DISPLAYSETTINGS.height}`;
}

const INITIALDOTSETTINGS = {
    dotColors: ["burlywood", "cornflowerblue", "mediumseagreen", "orange"],
    dotRadius: 9,
    dotsPerColor: 4
}

const CURRENTDOTSETTINGS = {
    dotColors: [],
    dotRadius: 0,
    dotsPerColor: 0
}

export const displaySettings = readable(DISPLAYSETTINGS);
export const initialDotSettings = readable(INITIALDOTSETTINGS);
export const currentDotSettings = writable(CURRENTDOTSETTINGS);
export const currentMapSettings = writable(CURRENTMAPSETTINGS);