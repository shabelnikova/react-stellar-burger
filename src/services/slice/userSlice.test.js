import userSlice, {
  authUserRequest,
  checkUserAuth,
  currentUserRequest, forgotPasswordRequest, logoutUserRequest,
  registerUserRequest, resetPasswordRequest,
  updateUserRequest
} from "./userSlice";
import {initialState} from "./userSlice";
import {mockUser} from "./constants";



describe('user slice', () => {
  it('should return initial state', () => {
    const result = userSlice(undefined, {type: ''});
    expect(result).toEqual(initialState);
  });
  it('should handle authCheckAction', () => {
    //Arrange
    const action = {type: checkUserAuth.type};
    //Act
    const result = userSlice(initialState, action);
    //Assert
    expect(result.isAuthChecked).toEqual(true);
  })
  it('should handle current user request', () => {
    const action = currentUserRequest.fulfilled( mockUser);
    const result = userSlice(initialState, action);
    expect(result.isPending).toBe(false);
    expect(result.isUserLoaded).toBe(true);
    expect(result.data).toBe(mockUser.user);
  })
  it('should handle current user request reject', () => {
    const action = currentUserRequest.rejected('');
    const result = userSlice(initialState, action);
    expect(result.isPending).toBe(false);
    expect(result.isUserLoaded).toBe(false);
  })
  it('should handle current user request pending', () => {
    const action = currentUserRequest.pending('');
    const result = userSlice(initialState, action);
    expect(result.isPending).toBe(true);
  })

  it('should handle auth user request', () => {
    const action = authUserRequest.fulfilled(mockUser);
    const result = userSlice(initialState, action);
    expect(result.isPending).toBe(false);
    expect(result.isUserLoaded).toBe(true);
    expect(result.data).toBe(mockUser.user);
  })
  it('should handle auth user request reject', () => {
    const action = authUserRequest.rejected('');
    const result = userSlice(initialState, action);
    expect(result.isPending).toBe(false);
    expect(result.isUserLoaded).toBe(false);
  })
  it('should handle auth user request pending', () => {
    const action = authUserRequest.pending('');
    const result = userSlice(initialState, action);
    expect(result.isPending).toBe(true);
  })
  it('should handle register user request', () => {
    const action = registerUserRequest.fulfilled(mockUser);
    const result = userSlice(initialState, action);
    expect(result.isPending).toBe(false);
    expect(result.isUserLoaded).toBe(true);
    expect(result.data).toBe(mockUser.user);
  })
  it('should handle register user request reject', () => {
    const action = registerUserRequest.rejected('');
    const result = userSlice(initialState, action);
    expect(result.isPending).toBe(false);
    expect(result.isUserLoaded).toBe(false);
  })
  it('should handle register user request pending', () => {
    const action = registerUserRequest.pending('');
    const result = userSlice(initialState, action);
    expect(result.isPending).toBe(true);
  })
  it('should handle update user request', () => {
    const action = updateUserRequest.fulfilled(mockUser);
    const result = userSlice(initialState, action);
    expect(result.isPending).toBe(false);
    expect(result.isUserLoaded).toBe(true);
    expect(result.data).toBe(mockUser.user);
  })
  it('should handle update user request reject', () => {
    const action = updateUserRequest.rejected('');
    const result = userSlice(initialState, action);
    expect(result.isPending).toBe(false);
    expect(result.isUserLoaded).toBe(false);
  })
  it('should handle update user request pending', () => {
    const action = updateUserRequest.pending('');
    const result = userSlice(initialState, action);
    expect(result.isPending).toBe(true);
  })
  it('should handle logout user request', () => {
    const action = logoutUserRequest.fulfilled(" ");
    const result = userSlice(initialState, action);
    expect(result.isPending).toBe(false);
    expect(result.isUserLoaded).toBe(false);
    expect(result.data).toBe(null);
    expect(result.passwordReset).toBe(false)
  })
  it('should handle logout user request reject', () => {
    const action = logoutUserRequest.rejected('');
    const result = userSlice(initialState, action);
    expect(result.isPending).toBe(false);
  })
  it('should handle logout user request pending', () => {
    const action = logoutUserRequest.pending('');
    const result = userSlice(initialState, action);
    expect(result.isPending).toBe(true);
  })
  it('should handle forgot password request', () => {
    const action = forgotPasswordRequest.fulfilled(" ");
    const result = userSlice(initialState, action);
    expect(result.isPending).toBe(false);
    expect(result.passwordForgot).toBe(true);
    expect(result.passwordReset).toBe(false)
  })
  it('should handle forgot password request reject', () => {
    const action = forgotPasswordRequest.rejected('');
    const result = userSlice(initialState, action);
    expect(result.isPending).toBe(false);
  })
  it('should handle forgot password request pending', () => {
    const action = forgotPasswordRequest.pending('');
    const result = userSlice(initialState, action);
    expect(result.isPending).toBe(true);
  })
  it('should handle reset password request', () => {
    const action = resetPasswordRequest.fulfilled(" ");
    const result = userSlice(initialState, action);
    expect(result.isPending).toBe(false);
    expect(result.passwordForgot).toBe(false);
    expect(result.passwordReset).toBe(true)
  })
  it('should handle reset password request reject', () => {
    const action = resetPasswordRequest.rejected('');
    const result = userSlice(initialState, action);
    expect(result.isPending).toBe(false);
  })
  it('should handle reset password request pending', () => {
    const action = resetPasswordRequest.pending('');
    const result = userSlice(initialState, action);
    expect(result.isPending).toBe(true);
  })
})
