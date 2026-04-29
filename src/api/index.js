const API_BASE = 'http://localhost:3001'

async function request(url, options = {}) {
  const response = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export const api = {
  getUser: () => request('/user'),
  getProjects: () => request('/projects'),
  getLeaderboard: () => request('/leaderboard'),
  postNote: (note) =>
    request('/notes', {
      method: 'POST',
      body: JSON.stringify(note),
    }),
}
