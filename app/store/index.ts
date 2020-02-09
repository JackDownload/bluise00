import { ActionContext, ActionTree, MutationTree } from 'vuex';
import { Route } from 'vue-router';
import Vue from 'vue';
import { getContent } from '@/utils';

export interface State {
  pages: Page[];
  posts: Post[];
  recipes: Recioe[];
  categories: Category[];
  route?: Route;
}

// Initial State
export const appState = {
  pages: [],
  posts: [],    
  recipes: [],
  categories: [],
};

export const mutations: MutationTree<State> = {
  SET_PAGES: (state, payload: object): void => {
    Vue.set(state, 'pages', payload);
  },
  SET_POSTS: (state, payload: object): void => {
    Vue.set(state, 'posts', payload);
  },
    SET_POSTS: (state, payload: object): void => {
    Vue.set(state, 'posts', payload);
  },
    SET_CATEGORIES: (state, payload: object): void => {
    Vue.set(state, 'categories', payload);
  },
    SET_RECIPES: (state, payload: object): void => {
    Vue.set(state, 'recipes', payload);
  },
};

interface Actions<S, R> extends ActionTree<S, R> {
  GET_PAGES_LIST(context: ActionContext<S, R>): Promise<void | Error>;
  GET_POSTS_LIST(context: ActionContext<S, R>): Promise<void | Error>;
  GET_RECIPES_LIST(context: ActionContext<S, R>): Promise<void | Error>;
  GET_CATEGORIES_LIST(context: ActionContext<S, R>): Promise<void | Error>;
  nuxtServerInit(context: ActionContext<S, R>): void;
}

export const actions: Actions<State, State> = {
  async GET_POSTS_LIST({ commit }): Promise<void | Error> {
    // Use webpack to search the blog directory matching .json files
    const context = await require.context('@/content/blog/', false, /\.json$/);
    const posts = await getContent({ context, prefix: 'blog' });
    commit('SET_POSTS', posts);
  },
      async GET_CATEGORIES_LIST({ commit }): Promise<void | Error> {
    // Use webpack to search the blog directory matching .json files
    const context = await require.context('@/content/category/', false, /\.json$/);
    const categories = await getContent({ context, prefix: 'recipe' });
    commit('SET_CATEGORIES', categories);
  },
    async GET_RECIPES_LIST({ commit }): Promise<void | Error> {
    // Use webpack to search the blog directory matching .json files
    const context = await require.context('@/content/recipe/', false, /\.json$/);
    const recipes = await getContent({ context, prefix: 'recipe' });
    commit('SET_RECIPES', recipes);
  },

  async GET_PAGES_LIST({ commit }): Promise<void | Error> {
    // Use webpack to search the blog directory matching .json files
    const context = await require.context('@/content/pages/', false, /\.json$/);
    const pages = await getContent({
      context,
      prefix: 'pages',
    });
    commit('SET_PAGES', pages);
  },

  async nuxtServerInit({ dispatch }): Promise<void> {
    await Promise.all([dispatch('GET_PAGES_LIST'), dispatch('GET_POSTS_LIST')]);
  },
};

export const state = (): State => ({
  ...appState,
});

export const strict = false;
