<script lang="ts" setup>

const props = defineProps({
    title: String,
    id: Number,
    user_created: String,
    date_created: String,
    fetch_todos: Function
})
const text = ref("")
const isUpdate = ref(false)

const { deleteItems, updateItem } = useDirectusItems();

interface Todo {
  id?: number;
  user_created?: string;
  date_created?: string;
  body: string;
}

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

const updateTodo = async () => {
  try {
    const newItem = { body: text.value };
    await updateItem<Todo>({
      collection: "todo",
      id: String(props.id),
      item: newItem,
    });
    if (props.fetch_todos == undefined) {return}
    text.value = ''
    await props.fetch_todos()
  } catch (e) {console.log(e)}
};

</script>

<template>
    <div class="card w-96 bg-white text-primary-content">
        <div class="card-body">
            <h2 class="card-title" v-if="!isUpdate">{{ title }}</h2>
            <section v-if="isUpdate">
              <input type="text" placeholder="Измените" class="input input-bordered input-accent w-full max-w-xs mr-4" v-model="text"/>
              <button class="btn btn-warning w-40 m-1" @click="updateTodo(), isUpdate = false">Изменить</button>
            </section>
            <NuxtTime v-if="date_created != undefined" :datetime="date_created" month="long" day="numeric" hour="numeric" minute="numeric" />
        </div>
        <div class="flex justify-center mb-3">
          <button class="btn btn-error w-40 m-1" @click="deleteTodo(String(id))">Удалить</button>
          <button class="btn btn-primary w-40 m-1" @click="isUpdate = !isUpdate">Изменить / Отменить изменение</button>
        </div>
    </div>
</template>
