import {
  addCharacter,
  getCharacter,
} from "./controller/character_controller.js";
import { addEnemies, getEmemies } from "./controller/enemies_controller.js";
import { addUser, getAllUsers, getUser } from "./controller/user_controller.js";
import { addWeapons, getWeapons } from "./controller/weapon_controller.js";

export const notfound = () => {
  return new Response("404", {
    headers: {
      "content-type": "text/html",
    },
  });
};

export const createRequestHandler = (readFile) => (request) =>
  hadleRequest(request, readFile);

const handleRoute = (baseUrl, subUrl) => {
  const [url, value] = subUrl.split("=");
  console.log({ baseUrl, url, value });

  const route = {
    "/": getAllUsers,
    "/users": {
      "/add": addUser,
      "/id": (value) => getUser(value),
    },
    "/characters": {
      "/add": addCharacter,
      "/id": (value) => getCharacter(value),
    },
    "/enemies": {
      "/add": addEnemies,
      "/id": (value) => getEmemies(value),
    },
    "/weapons": {
      "/add": addWeapons,
      "/id": (value) => getWeapons(value),
    },
  };

  if (!(baseUrl in route)) return notfound();
  return route[baseUrl][url](value);
};

const hadleRequest = async (request, readFile) => {
  const { pathname } = new URL(request.url);
  const [_, baseUrl, subUrl] = pathname.trim().split("/");
  handleRoute(baseUrl, subUrl);

  // if (!(url.pathname in routes)) return await notfound();
  // try {
  //   routes[pathname]();
  // } catch (error) {
  //   console.log(error);
  // }

  return new Response("Hi", {
    headers: {
      "content-type": "text/html",
    },
  });
};
