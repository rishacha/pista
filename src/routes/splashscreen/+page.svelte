<script lang="ts">
  import "$lib/app.css";
  import { open } from "@tauri-apps/plugin-dialog";
  import { writable } from "svelte/store";
  import { goto } from '$app/navigation';
  const selectedPath = writable<string | null>(null);

  const chooseDirectory = async () => {
    // Open a dialog
    const result = await open({
      multiple: false,
      directory: true,
    });
    console.log(result);

    

    if (typeof result === "string") {
      selectedPath.set(result);
    }
  };

  const proceed = () => {
    // Trigger navigation or mount main app logic
    console.log("Proceeding with path:", $selectedPath);
    goto('/')
  };
</script>

<main>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white"
  >
    <div
      class="p-10 bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md text-center space-y-6"
    >
      <h1 class="text-3xl font-bold">Welcome to My App</h1>
      <p class="text-gray-300">Please select a directory to continue</p>

      <button
        class="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white font-semibold transition"
        on:click={chooseDirectory}
      >
        Choose Directory
      </button>

      {#if $selectedPath}
        <div class="text-sm text-green-300 truncate">{$selectedPath}</div>
        <button
          class="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg text-white font-semibold mt-4"
          on:click={proceed}
        >
          Continue
        </button>
      {/if}
    </div>
  </div>
</main>
