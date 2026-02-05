export const appRoutes = {
  main: () => '/habitflow',
  articles: () => '/habitflow/articles',
  selectedArticle: (articleId: string) => `habitflow/articles/${articleId}`,
  postNotFound: (articleId: string) =>
    `habitflow/articles/${articleId}/not-found`,
  signUp: () => 'habitflow/sign-up',
  signIn: () => 'habitflow/sign-in',
  calendar: () => 'habitflow/calendar',
}
