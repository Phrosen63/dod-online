const commitObject = (context, {mutation, payload}) => {
  if (payload && typeof payload === 'object') {
    context.commit(mutation, payload);
  }
};

export default {
  commitObject,
};
