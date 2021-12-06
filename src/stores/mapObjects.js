export let mapObjects = [
    {
        mapName: "Baseline Scenario",
        mapRoute: "baseline",
        mapFiles: ["NOMAP", "MAP-autumn.forest.jpg", "MAP-autumn.forest.jpg", "MAP-autumn.forest.jpg"],
        briefDescription: "An autumn forest (this scenario must be completed first)",
        maxGenerations: 3,
        reproduce: true,
        briefDescription: "This is the baseline scenario.",
        longDescription: "<p>Natural Selection is a process by which populations of species evolve to become better adapted to their environment. Within a population individuals are varied and have different traits. If an individual has a trait or variation that makes it better adapted to its environment, that individual has a greater chance of survival. Those that survive are the ones that will reproduce and pass on their traits. Individuals that lack better adaptations are more likely to die out. Over many generations, the entire population will likely evolve to have the adaptations that make the species more successful.</p><p>Human activities are leading to environmental changes that force populations to evolve or become extinct. Some examples include: The overuse of antibiotics has led to bacteria developing resistance to the antibiotics. Excessive pesticide use has led to insect populations that cannot be killed by those pesticides, or to non-target species being decimated. Urban sprawl of cities into natural ecosystems causes loss of living space for wild animals and native plants. Pollution in the air, water, or soil can be toxic to organisms or interfere with normal physiological processes. Climate change is causing changes in ecosystems that organisms are adapting to. All of these scenarios alter the diversity of living organisms in their ecosystems through natural selection. Populations will have to evolve or they will become extinct.<p/><p>In this exercise, we want to illustrate and compare how human activities can affect natural selection using a model of an artificial population.</p>"

    },
    {
        mapName: "Climate Change Scenario",
        mapRoute: "climate-change",
        mapFiles: ["NOMAP", "MAP-climate.change.forest.jpg", "MAP-climate.change.forest.jpg", "MAP-climate.change.forest.jpg"],
        maxGenerations: 3,
        reproduce: true,
        briefDescription: "A forest under stress from climate change",
        longDescription: "Based on global shifts in weather patterns and shifts in temperature associated with global warming, many ecosystems will be affected. Some will experience changes in a variety of factors like temperature, water, and biodiversity. This scenario mimics a loss in plant biodiversity due to drought, and it models how a population is affected by natural selection."
    },
    {
        mapName: "Urban Sprawl Scenario",
        mapRoute: "urban-sprawl",
        mapFiles: ["NOMAP", "MAP-autumn.forest.jpg", "MAP-autumn.forest-50pct-urban.jpg", "MAP-autumn.forest-25pct-urban.jpg"],
        margins: [
            { leftMargin: 0, rightMargin: 0, topMargin: 0, bottomMargin: 0 }, 
            { leftMargin: 10, rightMargin: 10, topMargin: 10, bottomMargin: 10 }, 
            { leftMargin: 200, rightMargin: 200, topMargin: 10, bottomMargin: 10 }, 
            { leftMargin: 300, rightMargin: 300, topMargin: 10, bottomMargin: 10 }
        ],
        maxGenerations: 3,
        reproduce: true,
        briefDescription: "A forest shrinking from urbanization",
        longDescription: "Urban sprawl is a result of cities spreading into the surrounding countryside. Habitat is torn up and replaced with asphalt, concrete and metals. This causes a decrease in the size of habitat for living organisms and can result in a decrease in biodiversity as organisms increase in population density and compete for limited resources more. This scenario explores how natural selection is affected by human city growth."
    },
    {
        mapName: "Exotic Species Scenario",
        mapRoute: "exotic-species",
        mapFiles: ["NOMAP", "MAP-autumn.forest.jpg", "MAP-autumn.forest-50pct.exotic.species.jpg", "MAP-exotic.species.yellowed.forest.jpg"],
        maxGenerations: 3,
        reproduce: true,
        briefDescription: "A forest infested with an exotic species",
        longDescription: "<p>Often species are transported across the world, out of the ecosystems they have evolved in. This happens unintentionally through the global shipping trade, and intentionally when people bring plants and animals home with them. Often these exotic species do poorly, but sometimes they survive and thrive.</p><p>These species come to a new ecosystem without their natural enemies, and they are subject to minimal environmental resistance. Exotic species can quickly outcompete native species, and destroy biodiversity again, forcing remaining populations to adapt. In this simulation, you will examine how a population changes as the plant community is taken over by an exotic species.</p>"
    },
    {
        mapName: "Pesticide Resistance Scenario",
        mapRoute: "pesticide-resistance",
        mapFiles: ["NOMAP", "MAP-autumn.forest.jpg", "MAP-autumn.forest.jpg", "MAP-autumn.forest.jpg", "MAP-autumn.forest.jpg", "MAP-autumn.forest.jpg"],
        maxGenerations: 5,
        reproduce: true,
        briefDescription: "A forest infested with a species that is developing pesticide resistance",
        longDescription: "<p>Pesticides are chemicals that kill pests. They have been commonly used to keep unwanted pests out of our houses and out of our crops. One of the problems associated with the improper and consistent use of pesticides is that populations of pests may becomes resistant to a specific chemical. The process by which this happens is natural selection and human activity speeds it up.</p><p>For example, some of the insects in a population of pests may have a genetic variation that prevents them from being killed by an insecticide. As a farmer sprays pesticides on his field to kill this pest, the insects that can't be killed survive to reproduce, passing the genetic variation that allows for them to be resistant to the insecticide on to their offspring.</p><p>IMPORTANT: In this simulation, one color of pests will become immune to the killing effects of an insecticide after the third generation. During the last two generations, one color will be immune to the pesticide (represented by mouse clicks). You will explore what happens to the population with this environmental pressure.<p>"
    },
    {
        mapName: "Toxin Release Scenario",
        mapRoute: "toxic-release",
        mapFiles: ["NOMAP", "MAP-toxic.release.yellowed.forest.jpg", "MAP-toxic.release.yellowed.forest.jpg", "MAP-toxic.release.yellowed.forest.jpg"],
        maxGenerations: 3,
        reproduce: false,
        briefDescription: "A toxin is regularly released into the forest",
        longDescription: "LD 50 refers to the amount of a toxin or poison that causes the death of 50% of a target population. It is a way to measure the short-term poisoning potential of a chemical. In this simulation, skull and crossbones symbols reflect an area where a toxin has been released into the surrounding environment. This is similar to the natural disaster scenario, but the toxin is released again before the population has had time to recover through reproduction."
    },
    {
        mapName: "Natural Disaster Scenario",
        mapRoute: "natural-disaster",
        mapFiles: ["NOMAP", "MAP-autumn.forest.jpg", "MAP-autumn.forest.jpg", "MAP-autumn.forest.jpg"],
        maxGenerations: 3,
        reproduce: true,
        briefDescription: "A natural disaster is affecting the forest",
        longDescription: "<p>Natural disasters as a result of human activity. A natural disaster is a natural occurrence, usually sudden and often intense. Examples include wildfire, flood, blizzard, earthquake, tornado, hurricane, wind or ice storm. Some can be caused by human action:</p><ul><li>Some forest fires are a result of unattended campfires or carelessly tossed cigarette butts</li><li>Flooding may be a result of human-made dams and levees</li><li>Scientists are seeing an increase in hurricanes correlated with climate change.</li></ul><p>The resulting damage to the environment can have a serious negative effect on the diversity of an ecosystem by killing individuals, destroying shelters, and limiting resources for survivors. Within generations, populations can recover. This simulation will recreate how natural selection plays a role after a natural disaster occurs.</p>"
    }
]