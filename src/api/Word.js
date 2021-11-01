import { request } from './Client';

export function getWordInformation(word) {
  return request('get', 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word);
}
