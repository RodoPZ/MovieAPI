
import { APIKEY } from "../secret";

const Url = 'https://api.themoviedb.org/3/';

export async function api(section: string, args: string = ""){
    const response = await fetch(`${Url}${section}?api_key=${APIKEY}&${args}`)
    const data = await response.json()
    return data
}