export const appRoutes = {
  main: () => '/habbitflow',
  articles: () => '/habbitflow/articles',
  selectedArticle: (articleId: string) => `habbitflow/articles/${articleId}`,
  postNotFound: (articleId: string) =>
    `habbitflow/articles/${articleId}/not-found`,
  signUp: () => 'habbitflow/sign-up',
  signIn: () => 'habbitflow/sign-in',
}
