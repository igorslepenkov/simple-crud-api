import { IncomingMessage } from "http";
import { User } from "../data";

function getPostData(
  request: IncomingMessage
): Promise<{ username: string; age: number; hobbies: string[] }> {
  return new Promise((resolve, reject) => {
    let data: {
      username: string;
      age: number;
      hobbies: string[];
    };

    request.on("data", (chunk: string) => {
      data = JSON.parse(chunk);
    });

    request.on("end", () => {
      if (data.username && data.age && data.hobbies) {
        resolve(data);
      } else {
        throw new Error("400");
        reject();
      }
    });
  });
}

export { getPostData };
