export async function up(queryInterface) {
  await queryInterface.bulkInsert('Books', [
    {
      id: '11111111-1111-1111-1111-111111111111',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '9780132350884',
      genre: 'Programming',
      totalCopies: 3,
      availableCopies: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      title: 'The Pragmatic Programmer',
      author: 'David Thomas',
      isbn: '9780135957059',
      genre: 'Programming',
      totalCopies: 2,
      availableCopies: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '33333333-3333-3333-3333-333333333333',
      title: 'You Don\'t Know JS',
      author: 'Kyle Simpson',
      isbn: '9781491924464',
      genre: 'JavaScript',
      totalCopies: 4,
      availableCopies: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('Books', null, {});
}