async function Letter() {
  return Promise.all([
    fetch('https://jsonplaceholder.typicode.com/users'),
    fetch('https://jsonplaceholder.typicode.com/posts'),
  ]).then(responses => {
    return Promise.all(responses.map(response => response.json()))
  }).then(response => {
    const dataPosts = [];

    response[0].forEach((users) => {
      users['posts'] = response[1].filter(posts => posts.userId == users.id);
      dataPosts.push(users);
    });

    return dataPosts;
  }).catch(err => {
    throw Error(err);
  })
}

async function App() {
  const users = await Letter();

  const html = users.map(user => {
    return `<div class="container">
                  <strong>${user.name}</strong>
                    <div class="infos">
                      <p>Email: ${user.email.toLowerCase()}</p>
                      <p>Address: ${user.address.street}</p>
                      <p>Phone: ${user.phone}</p>
                  </div>
                  ${user.posts.map(posts => {
      return `
                      <div class="content">
                          <strong>${posts.title}</strong>
                          <p>${posts.body}</p>
                      </div>
                      `
    }).join("")}
              </div>`
  }).join("");

  document.querySelector('#root').insertAdjacentHTML("afterbegin", html);

}

App();
