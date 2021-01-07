// svelte store functions
import { derived, readable, writable } from 'svelte/store';
// custom array of available scenarios, including routing information for each MAPNAME-Clickdots.svelte component
import { mapObjects } from './activities.js';

const DISPLAYSETTINGS = {
    width: 800,
    height: 600,
    marginParams: {
        margins: 10,
        topMargin: 200, // specific margin settings also available
        // leftMargin: 200 // wdMargins and htMargins (left/right and top/bottom, respectively)
    }
}

const CURRENTMAPSETTINGS = {
    // backgroundImg: "/images/MAP-yellow.forest.jpg" <-- remove; set only within the individual MAPNAME-Clickdots.svelte components
    // copy these settings when user chooses scenario
    mapName: "",
    mapRoute: "",
    briefDescription: "",
    // state settings for activity
    currentColors: [],
    currentDotCounts: [],
    currentGeneration: 0
}

const INITIALDOTSETTINGS = {
    dotColors: ["burlywood", "cornflowerblue", "mediumseagreen", "orange"],
    dotRadius: 6,
    dotsPerColor: 4
}

const CURRENTDOTSETTINGS = {
    dotColors: [],
    dotRadius: 0,
    dotsPerColor: 0,
    randomCoordinates: []
}

export const displaySettings = readable(DISPLAYSETTINGS);
export const currentMapSettings = writable(CURRENTMAPSETTINGS);
export const initialDotSettings = readable(INITIALDOTSETTINGS);
export const currentDotSettings = writable(CURRENTDOTSETTINGS);

// derived value returns totals for each dot color
export const dotCount = derived(currentDotSettings, $currentDotSettings => {
    // component-internal array and associated reactive code to track current count of each dot color
    let counts = [];

    // set colorCounts (of length N) to value 0 (https://stackoverflow.com/questions/4049847/initializing-an-array-with-a-single-value)
    let counter = $currentDotSettings.dotColors.length;
    while (counter--) counts[$currentDotSettings.dotColors[counter]] = 0;

    // count total dots of each color if randomCoordinates is not empty
    if ($currentDotSettings.randomCoordinates) {
        for (let i=0; i<$currentDotSettings.randomCoordinates.length; i++) {
            counts[$currentDotSettings.randomCoordinates[i].color]++;
        }
    }
    return counts;
});

// generate the same number of random coordinates for each color in the array passed to "colors"
export function generateRandCoordinates (height, width, marginSettings, count, colors) {
    // set default currMargins object; updated below after parsing marginSettings
    let currMargins = { leftMargin: 0, rightMargin: 0, topMargin: 0, bottomMargin: 0 };

    // set individual margins (top/right/bottom/left)
    (marginSettings.leftMargin) ? currMargins.leftMargin = marginSettings.leftMargin
        : (marginSettings.wdMargins) ? currMargins.leftMargin = marginSettings.wdMargins
        : (marginSettings.margins) ? currMargins.leftMargin = marginSettings.margins : currMargins.leftMargin = 0;

    (marginSettings.rightMargin) ? currMargins.rightMargin = marginSettings.rightMargin
        : (marginSettings.wdMargins) ? currMargins.rightMargin = marginSettings.wdMargins
        : (marginSettings.margins) ? currMargins.rightMargin = marginSettings.margins : currMargins.rightMargin = 0;

    (marginSettings.topMargin) ? currMargins.topMargin = marginSettings.topMargin
        : (marginSettings.htMargins) ? currMargins.topMargin = marginSettings.htMargins
        : (marginSettings.margins) ? currMargins.topMargin = marginSettings.margins : currMargins.topMargin = 0;

    (marginSettings.bottomMargin) ? currMargins.bottomMargin = marginSettings.bottomMargin
        : (marginSettings.htMargins) ? currMargins.bottomMargin = marginSettings.htMargins
        : (marginSettings.margins) ? currMargins.bottomMargin = marginSettings.margins : currMargins.bottomMargin = 0;

    // generate the same number of dots for each color passed in, giving each dot random coordinates
    // NOTE: No checking for full or partial overlap
    let newDots = [];
    for (var i=0; i<colors.length; i++) {
        for (var j=0; j<count; j++) {
            newDots.push({
                x: (Math.round((Math.random() * (width - (currMargins.leftMargin + currMargins.rightMargin)))) + (currMargins.leftMargin)), 
                y: (Math.round((Math.random() * (height - (currMargins.topMargin + currMargins.bottomMargin)))) + (currMargins.topMargin)),
                color: colors[i]
            });
        }
    }
    // console.table(newDots);
    return newDots;
}
