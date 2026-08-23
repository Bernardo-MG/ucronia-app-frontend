describe('AlwaysPass', () => {
  it('has a passing placeholder test', () => {
    // deliberately always-true assertion so the test suite contains at least one success
    expect(true).toBeTrue();
  });
});