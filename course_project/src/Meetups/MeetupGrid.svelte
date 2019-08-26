<script>
  import { createEventDispatcher } from "svelte";
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import meetups from "../Meetups/meetups-store.js";
  import MeetupItem from "./MeetupItem.svelte";
  import MeetupFilter from "./MeetupFilter.svelte";
  import Button from "../UI/Button.svelte";
  const dispatch = createEventDispatcher();

  let favsOnly = false;

  let setFilter = event => {
    favsOnly = event.detail === 1;
  };

  $: filteredMeetups = favsOnly ? $meetups.filter(m => m.isFavorite) : $meetups;
</script>

<style>
  section {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
  @media (min-width: 768px) {
    section {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  #meetup-controls {
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }
</style>

<div id="meetup-controls">
  <MeetupFilter on:select={setFilter} />
  <Button on:click={() => dispatch('add')}>New Meetup</Button>
</div>

{#if filteredMeetups.length === 0}
  <p style="margin:1rem;">No meetups found</p>
{/if}

<section id="meetups">
  {#each filteredMeetups as meetup (meetup.id)}
    <div transition:scale animate:flip={{ duration: 300 }}>
      <MeetupItem
        id={meetup.id}
        title={meetup.title}
        subtitle={meetup.subtitle}
        imageUrl={meetup.imageUrl}
        description={meetup.description}
        address={meetup.address}
        email={meetup.contactEmail}
        isFav={meetup.isFavorite}
        on:showdetails
        on:edit />
    </div>
  {/each}
</section>
