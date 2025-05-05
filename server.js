import express from 'express';

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/users', async (req, res) => {
    const users = await fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error fetching users:', error);
            return [];
        });

    console.log(users);
    return res.status(200).send(`
      <h1 class='text-xl font-bold'>Users</h1>
      <div class='flex flex-row gap-4 flex-wrap mx-auto'>
      ${users.map(
          (user) =>
              `
          <div class='flex flex-col gap-2 border-2 border-gray-300 rounded-lg p-4 shadow-lg'>
            <div class='text-lg font-bold underline tracking-wide'>${user.name}</div>
            <div class='text-sm'>${user.email}</div>
            <div class='text-xs'>${user.website}</div>
         </div>
         `
      )}
      </div>
      `);
});
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
