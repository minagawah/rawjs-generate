declare global {
  var NODE_ENV: string;

  type TimeoutReturnType = ReturnType<typeof setTimeout>;
}

export {}
