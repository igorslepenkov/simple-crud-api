import { IncomingMessage } from "http";

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
      resolve(data);
    });
  });
}

export { getPostData };
