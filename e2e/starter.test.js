describe('Example', () => {
  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  it('should have welcome screen', async () => {
    await device.launchApp();
    await element(by.id('Botao')).tap();
  });
});
