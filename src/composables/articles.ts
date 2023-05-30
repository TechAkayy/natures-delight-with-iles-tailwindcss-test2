import { $fetch } from 'ofetch'
import type { Article, Articles, State } from '~/composables/config'

// const apiBaseUrl = 'http://localhost:3001'
const apiBaseUrl = 'https://dev.to/api'

const articles = ref([])

// https://developers.forem.com/api/v1#tag/articles/operation/getArticles
export function fetchArticles(
  url: string,
  params: Record<string, string | number | undefined> = {},
): Promise<any> {
  return $fetch(url, {
    baseURL: `${apiBaseUrl}/articles`,
    params,
  })
}

export const username = ref('')
export const tag = ref('vue')

export async function listArticles(
  tags: string | string[] = [],
  state: State = 'fresh',
  page: number = 1,
): Promise<Articles> {
  // username?: string,
  // tag: string = 'vue',

  tags = typeof tags === 'string' ? [tags] : tags
  tags = tags.join(',')
  const params = username.value
    ? { username: username.value, state }
    : { username: username.value, tag: tag.value, tags, state, page }
  articles.value = await fetchArticles('', params)
  return articles.value
}

export function getArticle(id: number): Promise<Article> {
  return fetchArticles(`/${id}`)
}

export const useArticles = () => {
  return {
    listArticles,
    getArticle,
  }
}
