export let mapObjects = [
    {
        mapName: "Baseline Scenario",
        mapRoute: "baseline",
        mapFiles: ["MAP-autumn.forest.jpg", "MAP-autumn.forest.jpg", "MAP-autumn.forest.jpg"],
        briefDescription: "An autumn forest"
    },
    {
        mapName: "Climate Change Scenario",
        mapRoute: "climate-change",
        mapFiles: ["MAP-climate.change.forest.jpg", "MAP-climate.change.forest.jpg", "MAP-climate.change.forest.jpg"],
        briefDescription: "A forest under stress from climate change"
    },
    {
        mapName: "Urban Sprawl Scenario",
        mapRoute: "urban-sprawl",
        mapFiles: ["MAP-autumn.forest.jpg", "MAP-autumn.forest-50pct-urban.jpg", "MAP-autumn.forest-25pct-urban.jpg"],
        briefDescription: "A forest shrinking from urbanization",
        margins: [
            { leftMargin: 10, rightMargin: 10, topMargin: 10, bottomMargin: 10 }, 
            { leftMargin: 200, rightMargin: 200, topMargin: 10, bottomMargin: 10 }, 
            { leftMargin: 300, rightMargin: 300, topMargin: 10, bottomMargin: 10 }
        ]
    },
    {
        mapName: "Exotic Species Scenario",
        mapRoute: "exotic-species",
        mapFiles: ["MAP-autumn.forest.jpg", "MAP-autumn.forest-50pct.exotic.species.jpg", "MAP-exotic.species.yellowed.forest.jpg"],
        briefDescription: "A forest infested with an exotic species"
    }
]