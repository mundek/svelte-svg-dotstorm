export let mapObjects = [
    {
        mapName: "Baseline Scenario",
        mapRoute: "baseline",
        mapFiles: ["NOMAP", "MAP-autumn.forest.jpg", "MAP-autumn.forest.jpg", "MAP-autumn.forest.jpg"],
        briefDescription: "An autumn forest",
        maxGenerations: 3
    },
    {
        mapName: "Climate Change Scenario",
        mapRoute: "climate-change",
        mapFiles: ["NOMAP", "MAP-climate.change.forest.jpg", "MAP-climate.change.forest.jpg", "MAP-climate.change.forest.jpg"],
        briefDescription: "A forest under stress from climate change",
        maxGenerations: 3
    },
    {
        mapName: "Urban Sprawl Scenario",
        mapRoute: "urban-sprawl",
        mapFiles: ["NOMAP", "MAP-autumn.forest.jpg", "MAP-autumn.forest-50pct-urban.jpg", "MAP-autumn.forest-25pct-urban.jpg"],
        briefDescription: "A forest shrinking from urbanization",
        margins: [
            { leftMargin: 0, rightMargin: 0, topMargin: 0, bottomMargin: 0 }, 
            { leftMargin: 10, rightMargin: 10, topMargin: 10, bottomMargin: 10 }, 
            { leftMargin: 200, rightMargin: 200, topMargin: 10, bottomMargin: 10 }, 
            { leftMargin: 300, rightMargin: 300, topMargin: 10, bottomMargin: 10 }
        ],
        maxGenerations: 3
    },
    {
        mapName: "Exotic Species Scenario",
        mapRoute: "exotic-species",
        mapFiles: ["NOMAP", "MAP-autumn.forest.jpg", "MAP-autumn.forest-50pct.exotic.species.jpg", "MAP-exotic.species.yellowed.forest.jpg"],
        briefDescription: "A forest infested with an exotic species",
        maxGenerations: 3
    },
    {
        mapName: "Pesticide Resistance Scenario",
        mapRoute: "pesticide-resistance",
        mapFiles: ["NOMAP", "MAP-autumn.forest.jpg", "MAP-autumn.forest.jpg", "MAP-autumn.forest.jpg", "MAP-autumn.forest.jpg", "MAP-autumn.forest.jpg"],
        briefDescription: "A forest infested with a species that is developing pesticide resistance",
        maxGenerations: 5
    }
]