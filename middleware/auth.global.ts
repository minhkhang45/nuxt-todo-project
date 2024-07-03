export default defineNuxtRouteMiddleware(async (to, _from) => {
  const { fetchUser, setUser } = useDirectusAuth();
  const user = useDirectusUser();
  if (!user.value) {
    const user = await fetchUser();
    setUser(user.value);
  }
  if (to.path == "/login" || to.path == "/regist") {
    return
  }
  if (!user.value) {
    return navigateTo("/login");
  }
});