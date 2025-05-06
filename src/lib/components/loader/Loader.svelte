<script lang="ts">
  import LoaderHeader from "./LoaderHeader.svelte";

  let progress = 0;

  // Start progress when component mounts or on user action
  window.api.send("start-progress");

  // Listen for progress updates from the main process
  window.api.receive('update-progress', (updatedProgress) => {
    progress = updatedProgress as number;
  });

</script>
<LoaderHeader></LoaderHeader>
<progress class="progress w-56" value="" max="100"></progress>
