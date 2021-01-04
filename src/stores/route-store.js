import { writable } from 'svelte/store';

// ROUTING COMPONENTS
// The following components are added to the 'routes' object
// in this store. The App.svelte component passes this store object
// to its routing subcomponent.
import Start from '../routes/Start.svelte'
import Baseline from '../routes/Baseline-Clickdots.svelte'
import Results from '../routes/Results.svelte'
import NotFound from '../routes/NotFound.svelte'

// create 'routes' object to pass to Router component in markup
export const routes = writable({
    // Exact path
    '/': Start,

    // Named activity
    '/baseline': Baseline,

    // Wildcard parameter
    '/results': Results,

    // Catch-all
    // This is optional, but if present it must be the last
    '*': NotFound,
});