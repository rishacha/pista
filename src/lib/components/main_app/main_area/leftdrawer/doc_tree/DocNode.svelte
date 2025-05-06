<script lang="ts">
  import { toggleNodeOpen, type FileNode } from "$lib/stores/doctree";
  import DocNode from "./DocNode.svelte";

  export let node: FileNode;

</script>

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
      <ul id={node.name + "-contents"} aria-hidden={!node.isOpen}>
        {#if node.children}
          {#each node.children as child}
            <DocNode node={child} />
          {/each}
        {/if}
      </ul>
    {/if}
  {:else}
    <span class="ml-6">{node.name}</span>
  {/if}
</li>
