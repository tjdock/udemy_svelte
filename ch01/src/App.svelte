<script>
  import ContactCard from "./ContactCard.svelte";

  let name = "Max";
  let age = 30;
  let title = "";
  let description = "";
  let image = "";
  let formState = "empty";
  let createdContacts = [];

  $: upcaseName = name.toUpperCase();
  $: console.log(name);
  $: if (name == "Maximilian") {
    console.log("It runs!");
    age = 99;
  }

  let incrementAge = () => {
    age += 1;
  };

  let changeName = () => {
    name = "Maximilian";
  };

  let nameInput = event => {
    name = event.target.value;
  };

  let addContact = () => {
    if (name.trim().length == 0 || title.trim().length == 0) {
      formState = "invalid";
      return;
    }
    createdContacts = [
      ...createdContacts,
      { name, title, image, description, id: Math.random() }
    ];
    formState = "done";
  };

  let deleteFirst = () => {
    createdContacts = createdContacts.slice(1);
  };
  let deleteLast = () => {
    createdContacts = createdContacts.slice(0, -1);
  };
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<h1>Hello {upcaseName},my age is {age}!</h1>
<button on:click={incrementAge}>Change Age</button>
<button on:click={changeName}>Chnage Name</button>
<form>
  <input type="text" value={name} on:input={nameInput} />
  <input type="text" bind:value={name} placeholder="name" />
  <input type="text" bind:value={title} placeholder="title" />
  <input type="text" bind:value={description} placeholder="description" />
  <input type="text" bind:value={image} placeholder="image" />
  <br />
  <button on:click|preventDefault={addContact} type="submit">
    Add Contract Card
  </button>
</form>
<button on:click={deleteFirst}>Delete First</button>
<button on:click={deleteLast}>Delete Last</button>
<button on:click|once={addContact}>Add Contract Card Once</button>
<hr />

{#if formState === 'done'}
  <p>Done!</p>
{:else if formState === 'invalid'}
  <p>Invalid input.</p>
{:else}
  <p>Please enter some data!</p>
{/if}

{#each createdContacts as contact, index (contact.id)}
  <h2># {index + 1}</h2>
  <ContactCard
    userName={contact.name}
    jobTitle={contact.title}
    description={contact.description}
    userImage={contact.image} />
{:else}
  <p>Please start adding some contacts,we found none!</p>
{/each}
