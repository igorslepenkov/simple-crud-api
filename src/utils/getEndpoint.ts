function getEndpoint(url: string, apiUrl: string): string | undefined {
  const array = url.match(RegExp(`${apiUrl}/\(.+\)`));
  if (array) {
    return array[1];
  }
}

export { getEndpoint };
