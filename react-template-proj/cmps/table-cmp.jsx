const animalInfos = [
      { type: 'Malayan Tiger', count: 787 },
      { type: 'Mountain Gorilla', count: 212 },
      { type: 'Fin Whale', count: 28 },
  ]
  
  export function Table() {
      return (
          <section className="table">
              <header className="table-header">
                  <h1>Rare Animals</h1>
              </header>
              <table>
                  <thead>
                      <tr>
                          <th>Type</th>
                          <th>Count</th>
                          <th>Search</th>
                      </tr>
                  </thead>
                  <tbody>
                      {animalInfos.map((animal, idx) => (
                          <tr key={idx}>
                              <td>{animal.type}</td>
                              <td>{animal.count}</td>
                              <td><a href={`//www.google.com/search?q=${animal.type})`}>Search</a>
                          </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </section>
      )
  }