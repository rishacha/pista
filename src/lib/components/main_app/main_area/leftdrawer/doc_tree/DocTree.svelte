<script lang="ts">
  import { loadMarkdownStructure, toggleNodeOpen, treeData, type FileNode } from "$lib/stores/doctree";
  import { onMount } from "svelte";

  onMount(() => {
    loadMarkdownStructure();
  });
</script>

<ul class="list-none pl-0">
  {#each $treeData as node (node.name)}
    <li class="ml-4">
      {#if node.type === "folder"}
        <button
          on:click={() => toggleNodeOpen(node.name)}
          class="cursor-pointer flex items-center"
          aria-expanded={node.isOpen}
          aria-controls={node.name + "-contents"}
        >
          <span
            class={`mr-2 transition-transform ${node.isOpen ? "rotate-90" : ""}`}
          >
            ▶
          </span>
          <span class="font-bold">{node.name}</span>
        </button>
        {#if node.isOpen}
          <!-- Ensure children exist before attempting to render them -->
          {#if node.children && node.children.length > 0}
            <ul
              id={node.name + "-contents"}
              aria-hidden={!node.isOpen}
            >
              {#each node.children as child}
                <li>
                  {#if child.type === "folder"}
                    <button
                      on:click={() => toggleFolder(child.name)}
                      class="cursor-pointer flex items-center"
                    >
                      <span
                        class={`mr-2 ${openFolders.has(child.name) ? "rotate-90" : ""}`}
                      >
                        ▶
                      </span>
                      <span class="font-bold">{child.name}</span>
                    </button>
                    {#if openFolders.has(child.name)}
                      <!-- Recursive or nested rendering -->
                      {#if child.children && child.children.length > 0}
                        <ul>
                          {#each child.children as subChild}
                            <li>
                              <span class="ml-6">{subChild.name}</span>
                            </li>
                          {/each}
                        </ul>
                      {/if}
                    {/if}
                  {:else}
                    <span class="ml-6">{child.name}</span>
                  {/if}
                </li>
              {/each}
            </ul>
          {/if}
        {/if}
      {:else}
        <span class="ml-6">{node.name}</span>
      {/if}
    </li>
  {/each}
</ul>

<style>
  .rotate-90 {
    transform: rotate(90deg);
    transition: transform 0.2s;
  }
</style>
