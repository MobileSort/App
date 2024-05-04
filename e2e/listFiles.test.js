describe('List Files Test', () => {
  beforeEach(async () => {
    await device.launchApp();
    await element(by.text('My Files')).tap();
  });

  it('Should Show Files Screen', async () => {
    await element(by.id('Botao')).tap();
  });
});
