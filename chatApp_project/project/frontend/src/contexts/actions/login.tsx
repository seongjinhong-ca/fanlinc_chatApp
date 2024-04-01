export const loginWithToken = async (
  updateState: Function,
  state: any,
  args: { token: string }
) => {
  localStorage.setItem("fanlinc-token", args.token);
  await updateState({ token: args.token });
};

export const setIdentity = async (
  updateState: Function,
  state: any,
  args: { identity: any }
) => {
  await updateState({ identity: args.identity });
};
