import fetch from 'node-fetch';
interface SearchResult {
  // Define the shape of the search result here
  title: string | null;
  description: string | null;
}

export const getAPIResults = async (searchTerm: string): Promise<SearchResult[]> => {
  const url = `https://api.example.com/search?q=${encodeURIComponent(searchTerm)}`;
  const response = await fetch(url);
  const jsonResponse = await response.json();
  
  // Type assertion to tell TypeScript the shape of the JSON response
  const { results } = jsonResponse as { results: SearchResult[] };
  
  return results;
};