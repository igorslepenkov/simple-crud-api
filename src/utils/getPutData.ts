import { IncomingMessage } from "http";

function getPutData(
  request: IncomingMessage
): Promise<{
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}> | void {
  return new Promise((resolve, reject) => {
    let data: {
      id: string;
      username: string;
      age: number;
      hobbies: string[];
    };

    request.on("data", (chunk: string) => {
      data = JSON.parse(chunk);
    });

    request.on("end", () => {
      if (data.id && data.username && data.age && data.hobbies) {
        resolve(data);
      } else {
        throw new Error("400");
      }
    });
  });
}

export { getPutData };
