// svelte store functions
import { derived, readable, writable } from 'svelte/store';
// custom array of available scenarios, including routing information for each MAPNAME-Clickdots.svelte component
import { mapObjects } from './mapObjects.js';

const DISPLAYSETTINGS = {
    width: 800,
    height: 600,
    marginParams: {
        htMargins: 10,
        wdMargins: 15, // specific margin settings also available
        // leftMargin: 200 // wdMargins and htMargins (left/right and top/bottom, respectively)
    },
    debugging: false
}

const COMPLETEDROUTES = {
    routes: [],
    baselineFlag: true
};

let CURRENTMAPSETTINGS = {
    // copy these settings when user chooses scenario
    mapName: "",
    mapRoute: "",
    briefDescription: "",
    mapFiles: [],
    margins: [],
    // state settings for activity
    currentColors: [],
    currentDotCounts: [],
    survivalData: [],
    minRemaining: 20,
    currentGeneration: 0,
    resistantDotColor: "",
    reproduce: true,
    genMultiplier: 5
}

// configure initial settings here
const INITIALDOTSETTINGS = {
    dotColors: [
        "burlywood", "cornflowerblue",
        "mediumseagreen", "orange", 
        "blueviolet", "crimson", 
        "gold", "darkturquoise", 
        "lawngreen", "indigo"
    ],
    dotRadius: 8,
    dotsPerColor: 5,
    randomCoordinates: []
}

const CURRENTDOTSETTINGS = {
    dotColors: [],
    dotRadius: 0,
    dotsPerColor: 0,
    randomCoordinates: []
}

export const displaySettings = writable(DISPLAYSETTINGS);
export const currentMapSettings = writable(CURRENTMAPSETTINGS);
export const initialDotSettings = readable(INITIALDOTSETTINGS);
export const currentDotSettings = writable(CURRENTDOTSETTINGS);
export const completedRoutes = writable(COMPLETEDROUTES);

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

export const chartData = derived(currentMapSettings, $currentMapSettings => {
    var chartPoints = [];
    // initialize points array with an object for each color; use first generation data as source of colors
    // console.table($currentMapSettings.survivalData);
    for (const color in $currentMapSettings.survivalData[0]) {
        var currObject = {};
        currObject['color'] = color;
        currObject['points'] = [];
        for (const generation in $currentMapSettings.survivalData) {
            // console.log($currentMapSettings.survivalData[generation][color]);
            var pointObj = {};
            pointObj['x'] = +generation;
            pointObj['y'] = $currentMapSettings.survivalData[generation][color];
            currObject['points'] = [...currObject['points'], pointObj]
        }
        chartPoints = [...chartPoints, currObject];
        // console.log(currObject['color'], color, $currentMapSettings.survivalData[0][color]);
        // console.table(chartPoints);
    }
    // console.table(chartPoints);
    return chartPoints;
});

// generate the same number of random coordinates for each color in the array passed to "colors"
export function generateRandCoordinates (height, width, marginSettings, count, colors) {
    // set default currMargins object; updated below after parsing marginSettings
    let currMargins = { leftMargin: 0, rightMargin: 0, topMargin: 0, bottomMargin: 0 };

    // set individual margins (top/right/bottom/left)
    (marginSettings.leftMargin) ? currMargins.leftMargin = marginSettings.leftMargin
        : (marginSettings.wdMargins) ? currMargins.leftMargin = marginSettings.wdMargins
        : (marginSettings.margins) ? currMargins.leftMargin = marginSettings.margins 
        : currMargins.leftMargin = 0;

    (marginSettings.rightMargin) ? currMargins.rightMargin = marginSettings.rightMargin
        : (marginSettings.wdMargins) ? currMargins.rightMargin = marginSettings.wdMargins
        : (marginSettings.margins) ? currMargins.rightMargin = marginSettings.margins 
        : currMargins.rightMargin = 0;

    (marginSettings.topMargin) ? currMargins.topMargin = marginSettings.topMargin
        : (marginSettings.htMargins) ? currMargins.topMargin = marginSettings.htMargins
        : (marginSettings.margins) ? currMargins.topMargin = marginSettings.margins 
        : currMargins.topMargin = 0;

    (marginSettings.bottomMargin) ? currMargins.bottomMargin = marginSettings.bottomMargin
        : (marginSettings.htMargins) ? currMargins.bottomMargin = marginSettings.htMargins
        : (marginSettings.margins) ? currMargins.bottomMargin = marginSettings.margins 
        : currMargins.bottomMargin = 0;

    function overlapCheck(dotArr, x, y) {
        let flag = false;
        dotArr.forEach((item) => {
            if(item.x === x && item.y === y) {
                flag = true;
            }
            return flag;
        });
    }
    // generate the same number of dots for each color passed in, giving each dot random coordinates
    // NOTE: No checking for full or partial overlap
    let newDots = [];
    for (var i=0; i<colors.length; i++) {
        for (var j=0; j<count; j++) {
            let the_X = (Math.round((Math.random() * (width - (currMargins.leftMargin + currMargins.rightMargin)))) + (currMargins.leftMargin));
            let the_Y = (Math.round((Math.random() * (height - (currMargins.topMargin + currMargins.bottomMargin)))) + (currMargins.topMargin));
            if (overlapCheck(newDots, the_X, the_Y)) {
                the_X = the_X + Math.floor((Math.random() * 3) + 3);
                if (Math.random() > .5) { the_X = (the_X * -1) };
                the_y = the_y + Math.floor((Math.random() * 3) + 3);
                if (Math.random() > .5) { the_Y = (the_Y * -1) };
            }
            newDots.push({
                x: the_X, 
                y: the_Y,
                color: colors[i]
            });
        }
    }
    // console.table(newDots);
    return newDots;
}
