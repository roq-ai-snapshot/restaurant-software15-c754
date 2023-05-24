import axios from 'axios';
import { Menu_categoriesInterface } from 'interfaces/menu_categories';

export const getMenu_categories = async () => {
  const response = await axios.get(`/api/menu-categories`);
  return response.data;
};

export const createMenu_categories = async (menu_categories: Menu_categoriesInterface) => {
  const response = await axios.post('/api/menu-categories', menu_categories);
  return response.data;
};

export const updateMenu_categoriesById = async (id: string, menu_categories: Menu_categoriesInterface) => {
  const response = await axios.put(`/api/menu-categories/${id}`, menu_categories);
  return response.data;
};

export const getMenu_categoriesById = async (id: string) => {
  const response = await axios.get(`/api/menu-categories/${id}`);
  return response.data;
};
