<script lang="ts">
  // CSS Import
  import "$lib/app.css";
  // import "@fortawesome/fontawesome-free/css/all.min.css";

  // Component Imports
  import MainApp from "$lib/components/main_app/MainApp.svelte";
  import Loader from "$lib/components/loader/Loader.svelte";
  import { graphPath } from "$lib/stores/graph";

  console.log('Loaded graph : ',$graphPath);

  // Loader Flag
  let openLoader = false;
</script>

{#if !openLoader}
  <MainApp><slot /></MainApp>
{:else}
  <Loader></Loader>
{/if}
