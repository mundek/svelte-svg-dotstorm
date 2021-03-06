import { writable } from 'svelte/store';

// ROUTING COMPONENTS
// The following components are added to the 'routes' object
// in this store. The App.svelte component passes this store object
// to its routing subcomponent.
import Start from '../routes/Start.svelte';
import Baseline from '../routes/Baseline-Clickdots.svelte';
import ClimateChange from '../routes/ClimateChange-Clickdots.svelte';
import UrbanSprawl from '../routes/UrbanSprawl-Clickdots.svelte';
import ExoticSpecies from '../routes/ExoticSpecies-Clickdots.svelte';
import PesticideResistance from '../routes/PesticideResistance-Clickdots.svelte';
import ToxicRelease from '../routes/ToxicRelease-Clickdots.svelte';
import NaturalDisaster from '../routes/NaturalDisaster-Clickdots.svelte';
import GenResults from '../routes/GenerationResults.svelte';
import FinalResults from '../routes/FinalResults.svelte';
import NotFound from '../routes/NotFound.svelte';

// create 'routes' object to pass to Router component in markup
export const routes = writable({
    // Exact path
    '/': Start,

    // Named activity
    '/baseline': Baseline,
    '/climate-change': ClimateChange,
    '/urban-sprawl': UrbanSprawl,
    '/exotic-species': ExoticSpecies,
    '/pesticide-resistance': PesticideResistance,
    '/toxic-release': ToxicRelease,
    '/natural-disaster': NaturalDisaster,

    // Wildcard parameter
    '/genResults': GenResults,

    // Wildcard parameter
    '/finalResults': FinalResults,

    // Catch-all
    // This is optional, but if present it must be the last
    '*': NotFound,
});