<script lang="ts" setup>

const props = defineProps({
    title: String,
    id: Number,
    user_created: String,
    date_created: String,
    fetch_todos: Function
})

const { deleteItems } = useDirectusItems();

const deleteTodo = async (id: string) => {
  try {
    const items = [id];
    console.log(id)
    await deleteItems({ collection: "todo", items })
    if (props.fetch_todos == undefined) {
        return
    }
    await props.fetch_todos()
  } catch (e) {
    console.log(e)
  }
};

</script>

<template>
    <div class="card w-96 bg-white text-primary-content">
        <div class="card-body">
            <h2 class="card-title">{{ title }}</h2>
            <h1>{{ date_created }}</h1>
            <h1>{{ user_created }}</h1>
        </div>
        <button class="btn btn-error w-40 m-1" @click="deleteTodo(String(id))">Удалить</button>
    </div>
</template>
