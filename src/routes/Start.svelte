
<script>
    import Router from 'svelte-spa-router';
    import { replace } from 'svelte-spa-router';

    import { initialDotSettings, currentDotSettings } from '../stores/activity-store.js';

    function startQuiz() {
        console.table($currentDotSettings);$currentDotSettings = $initialDotSettings;
        console.table($currentDotSettings);
        replace("/activity");
    }
</script>

<main>
    <form>
        <button on:click|preventDefault="{startQuiz}">Start Quiz</button>
    </form>
</main>