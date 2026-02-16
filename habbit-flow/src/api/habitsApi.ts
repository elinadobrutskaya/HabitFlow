const BASE_URL =
  'https://6988664c780e8375a68835d8.mockapi.io/habitflow/users/1/habits'

export const habitsApi = {
  getHabits: () => fetch(BASE_URL).then((res) => res.json()),

  createHabit: (title: string) =>
    fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, completedDates: [] }),
    }).then((res) => res.json()),

  updateHabit: (id: string, completedDates: string[]) =>
    fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completedDates }),
    }).then((res) => res.json()),
}
