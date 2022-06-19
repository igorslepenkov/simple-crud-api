import { User } from "./data";
import { validate as uuidValidate } from "uuid";
import fs from "fs/promises";
import path from "path";

class Controller {
  async getAllUsers(): Promise<User[]> {
    const usersArray = await fs.readFile(
      path.join(__dirname, "./database.json")
    );
    return JSON.parse(usersArray.toString());
  }

  async getUser(id: string): Promise<User | undefined | void> {
    if (!uuidValidate(id)) {
      throw new Error("400");
    }

    const usersArray = await this.getAllUsers();
    const user = usersArray.find((user) => user.id === id);

    if (user) {
      return user;
    } else {
      throw new Error("404");
    }
  }

  async postUser({
    username,
    age,
    hobbies,
  }: {
    username: string;
    age: number;
    hobbies: string[] | [];
  }): Promise<User> {
    try {
      if (username && age && (hobbies || hobbies === [])) {
        const usersArray = await this.getAllUsers();
        const newUser = new User(username, age, hobbies);
        usersArray.push(newUser);

        await fs.writeFile(
          path.join(__dirname, "./database.json"),
          JSON.stringify(usersArray)
        );

        return newUser;
      } else {
        throw new Error("400");
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async putUser(
    id: string,
    user: { id: string; username: string; age: number; hobbies: string[] | [] }
  ): Promise<User> {
    try {
      if (!uuidValidate(id) || !id) {
        throw new Error("400");
      }

      if (user.id && user.username && user.age && user.hobbies) {
        const usersArray = await this.getAllUsers();

        const currentUser = usersArray.find((user) => user.id === id);
        if (currentUser) {
          currentUser.username = user.username;
          currentUser.age = user.age;
          currentUser.hobbies = user.hobbies;

          await fs.writeFile(
            path.join(__dirname, "./database.json"),
            JSON.stringify(usersArray)
          );

          return currentUser;
        } else {
          throw new Error("404");
        }
      } else {
        throw new Error("400");
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteUser(id: string): Promise<void> {
    if (!uuidValidate(id)) {
      throw new Error("400");
    }
    const usersArray = await this.getAllUsers();

    const user = usersArray.find((user) => user.id === id);
    if (user) {
      const idx = usersArray.indexOf(user);
      usersArray.splice(idx, 1);

      await fs.writeFile(
        path.join(__dirname, "./database.json"),
        JSON.stringify(usersArray)
      );
      return;
    } else {
      throw new Error("404");
    }
  }
}

export { Controller };
