export const logoutAndClearStorage = async (
  updateState: Function,
  state: any,
  args?: any
) => {
  await updateState({ identity: null, token: null });
  localStorage.removeItem("fanlinc-token");
};
