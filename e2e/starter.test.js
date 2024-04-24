describe('Example', () => {
  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  it('should have welcome screen', async () => {
    await device.launchApp();
    debugger;
    await expect(element(by.id('welcome'))).toBeVisible();
  });
});
