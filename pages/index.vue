<template>
  <div class="flex justify-center items-center min-h-screen flex-col">
    <div class="flex items-center">
      <input type="text" placeholder="Напишите туду" class="input input-bordered input-accent w-full max-w-xs mr-4"
        v-model="text" />
      <button class="btn btn-primary" @click="createTodo()">Создай!</button>
    </div>
    <section>
      <TransitionGroup name="list" tag="ul">
        <todoView v-for="todo in todos" :key="todo.id" :title="todo.body" :id="todo.id"
          :date_created="todo.date_created" :fetch_todos="fetchTodos" class="my-3" />
      </TransitionGroup>
    </section>
  </div>
</template>

<script lang="ts" setup>
const text = ref("")

const { createItems, getItems, } = useDirectusItems();
let todos = ref<Todo[]>([])


interface Todo {
  id?: number;
  user_created?: string;
  date_created?: string;
  body: string;
}

const createTodo = async () => {
  try {
    const items: Todo =
    {
      body: text.value,
    }
      ;
    await createItems<Todo>({ collection: "todo", items });
    text.value = ''
    await fetchTodos()
  } catch (e) {
    console.log(e)
  }
}

const fetchTodos = async () => {
  try {
    todos.value = await getItems<Todo>({
      collection: "todo",
    });
    return todos.value
  } catch (e) {
    console.log(e)
  }
};


onMounted(() => {
  fetchTodos()
})
</script>

<style>
.list-move,
/* применять переход к движущимся элементам */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* убедитесь, что удаляющиеся элементы выведены из потока, чтобы 
анимации перемещения могли быть рассчитаны правильно. */
.list-leave-active {
  position: absolute;
}
</style>