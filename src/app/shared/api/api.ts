import environment from '@environment/environment';

function getBaseApiUrl(): string {
  return environment.apiUrl;
}

function getApiUrl(endpoint: string): string {
  return `${getBaseApiUrl()}/${endpoint}`;
}

export { getBaseApiUrl, getApiUrl };
