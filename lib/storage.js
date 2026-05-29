import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "posts";

export async function getPosts() {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export async function savePosts(posts) {
  await AsyncStorage.setItem(KEY, JSON.stringify(posts));
}

export async function getPost(id) {
  const posts = await getPosts();
  return posts.find((p) => p.id === id);
}

export async function addPost(post) {
  const posts = await getPosts();
  await savePosts([post, ...posts]);
}

export async function updatePost(updated) {
  const posts = await getPosts();
  const newPosts = posts.map((p) =>
    p.id === updated.id ? updated : p
  );
  await savePosts(newPosts);
}

export async function deletePost(id) {
  const posts = await getPosts();
  await savePosts(posts.filter((p) => p.id !== id));
}
