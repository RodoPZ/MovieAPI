import { Handler, HandlerEvent } from "@netlify/functions";
import axios, { AxiosError } from "axios";
export const handler: Handler = async (event: HandlerEvent) => {
  const section = event.queryStringParameters?.section;
  const args = event.queryStringParameters?.args || "";
  const APIKEY = process.env.API;
  const Url = `https://api.themoviedb.org/3/${section}?api_key=${APIKEY}&${args}`;
  try {
    const { data } = await axios.get(Url);
    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch" }),
    };
  }
};
