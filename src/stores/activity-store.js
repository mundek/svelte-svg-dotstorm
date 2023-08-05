// svelte store functions
import { derived, readable, writable } from 'svelte/store';
// custom array of available scenarios, including routing information for each MAPNAME-Clickdots.svelte component
import { mapObjects } from './mapObjects.js';

const DISPLAYSETTINGS = {
    width: 800,
    height: 600,
    defaultHeightMargins: 15,
    defaultWidthMargins: 10,
    debugging: true
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
    longDescription: "",
    mapFiles: [],
    marginArray: [],
    margins: [],
    // state settings for activity
    currentColors: [],
    currentDotCounts: [],
    survivalData: [],
    minRemaining: 20,
    currentGeneration: 0,
    resistantDotColor: "",
    reproduce: true,
    genMultiplier: 4
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
    dotRadius: 13,
    dotsPerColor: 4,
}

const CURRENTDOTSETTINGS = {
    dotColors: [],
    dotRadius: 0,
    dotsPerColor: 0,
    randomCoordinates: [],
    isSingleColor: false,
    startingCount: 0
}

// internal margin settings
const CURRENTMARGINSETTINGS = { leftMargin: 0, rightMargin: 0, topMargin: 0, bottomMargin: 0 };

export const displaySettings = writable(DISPLAYSETTINGS);
export const currentMapSettings = writable(CURRENTMAPSETTINGS);
export const initialDotSettings = readable(INITIALDOTSETTINGS);
export const currentDotSettings = writable(CURRENTDOTSETTINGS);
export const completedRoutes = writable(COMPLETEDROUTES);

// derived value returns totals for each dot color
export const dotCount = derived(currentDotSettings, ($currentDotSettings) => {
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
    // TODO/DEVO: TEST FOR ONLY ONE COLOR REMAINING
    if (Object.keys(counts).length > 0) {
        let theValues = Object.values(counts);
        let singleCheck = theValues.filter((aVal) => {
            // console.log(aVal > 0);
            if (aVal > 0) {
                return true;    
            }
            return false;
        });
        // console.log(singleCheck, 'values', theValues, theValues.length);
        // console.log(singleCheck);
        if (singleCheck.length === 1) {
            console.log("Only one color left!");
            $currentDotSettings.isSingleColor = true;
        } else {
            $currentDotSettings.isSingleColor = false;
        }
    }
    // TODO/DEVO ******
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
    // let currMargins = { leftMargin: 0, rightMargin: 0, topMargin: 0, bottomMargin: 0 };

    // set individual margins (top/right/bottom/left)
    (marginSettings.leftMargin) ? CURRENTMARGINSETTINGS.leftMargin = marginSettings.leftMargin
        : (marginSettings.wdMargins) ? CURRENTMARGINSETTINGS.leftMargin = marginSettings.wdMargins
        : (marginSettings.margins) ? CURRENTMARGINSETTINGS.leftMargin = marginSettings.margins 
        : CURRENTMARGINSETTINGS.leftMargin = DISPLAYSETTINGS.defaultWidthMargins;

    (marginSettings.rightMargin) ? CURRENTMARGINSETTINGS.rightMargin = marginSettings.rightMargin
        : (marginSettings.wdMargins) ? CURRENTMARGINSETTINGS.rightMargin = marginSettings.wdMargins
        : (marginSettings.margins) ? CURRENTMARGINSETTINGS.rightMargin = marginSettings.margins 
        : CURRENTMARGINSETTINGS.rightMargin = DISPLAYSETTINGS.defaultWidthMargins;

    (marginSettings.topMargin) ? CURRENTMARGINSETTINGS.topMargin = marginSettings.topMargin
        : (marginSettings.htMargins) ? CURRENTMARGINSETTINGS.topMargin = marginSettings.htMargins
        : (marginSettings.margins) ? CURRENTMARGINSETTINGS.topMargin = marginSettings.margins 
        : CURRENTMARGINSETTINGS.topMargin = DISPLAYSETTINGS.defaultHeightMargins;

    (marginSettings.bottomMargin) ? CURRENTMARGINSETTINGS.bottomMargin = marginSettings.bottomMargin
        : (marginSettings.htMargins) ? CURRENTMARGINSETTINGS.bottomMargin = marginSettings.htMargins
        : (marginSettings.margins) ? CURRENTMARGINSETTINGS.bottomMargin = marginSettings.margins 
        : CURRENTMARGINSETTINGS.bottomMargin = DISPLAYSETTINGS.defaultHeightMargins;

    function overlapCheck(dotArr, x, y) {
        dotArr.forEach((item) => {
            if(item.x === x && item.y === y) {
                return true;
            }
            return false;
        });
    }
    // generate the same number of dots for each color passed in, giving each dot random coordinates
    let newDots = [];
    let workingWidth = width - 8;
    let workingHeight = height - 8;
    for (var i=0; i<colors.length; i++) {
        for (var j=0; j<count; j++) {
            let the_X = (Math.round((Math.random() * (workingWidth - (CURRENTMARGINSETTINGS.leftMargin + CURRENTMARGINSETTINGS.rightMargin)))) + (CURRENTMARGINSETTINGS.leftMargin));
            let the_Y = (Math.round((Math.random() * (workingHeight - (CURRENTMARGINSETTINGS.topMargin + CURRENTMARGINSETTINGS.bottomMargin)))) + (CURRENTMARGINSETTINGS.topMargin));
            if (overlapCheck(newDots, the_X, the_Y)) {
                if (Math.random() > .5) {
                    the_X = the_X + Math.floor((Math.random() * 3) + 3);
                } else {
                    the_X = the_X - Math.floor((Math.random() * 3) + 3);
                }
                if (Math.random() > .5) {
                    the_y = the_y + Math.floor((Math.random() * 3) + 3);
                } else {
                    the_y = the_y - Math.floor((Math.random() * 3) + 3);
                }
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

// function for randomly repositioning dots; called after a dot is removed
export function repositionDots (theDots) {
    // console.table(theDots);
    let theNewDots = [...theDots];
    theNewDots.filter((aDot, idx) => {
        // console.log(idx, aDot);
        let xOffset = Math.round(((Math.random() * 2) - 1) * (Math.floor(Math.random() * 45) + 1));
        let yOffset = Math.round(((Math.random() * 2) - 1) * (Math.floor(Math.random() * 45) + 1));

        if ((aDot.x + xOffset) > DISPLAYSETTINGS.width - CURRENTMARGINSETTINGS.rightMargin) {
            // console.log("off right", idx);
            xOffset = xOffset * -1;
        } else if ((aDot.x + xOffset) < CURRENTMARGINSETTINGS.leftMargin) {
            // console.log("off left", idx);
            xOffset = xOffset * -1;
        } else {
            aDot.x = aDot.x + xOffset;
        }
        if ((aDot.y + yOffset) > DISPLAYSETTINGS.height - CURRENTMARGINSETTINGS.bottomMargin) {
            // console.log("off bottom", idx);
            yOffset = yOffset * -1;
        } else if ((aDot.y + yOffset) < CURRENTMARGINSETTINGS.topMargin) {
            // console.log("off top", idx);
            yOffset = yOffset * -1;
        } else {
            aDot.y = aDot.y + yOffset;
        }
        // console.log(`start: ${aDot.x}, ${aDot.y}; change: ${aDot.x + xOffset}, ${aDot.y + yOffset}`)        
    })
    // console.table(theNewDots);
    return theNewDots;
}
